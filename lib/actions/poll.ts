"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function createPoll(data: {
  title: string;
  description: string;
  expiresAt?: string | null;
  public?: boolean;
  invites?: string[];
  questions: {
    title: string;
    options: string[];
  }[];
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Trebuie să fii autentificat.");
  }

  const clerkUser = await currentUser();

  let user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        name: clerkUser?.fullName || "",
        email: clerkUser?.primaryEmailAddress?.emailAddress || "",
      },
    });
  } else if (!user.name || !user.email) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name || clerkUser?.fullName || "",
        email: user.email || clerkUser?.primaryEmailAddress?.emailAddress || "",
      },
    });
  }

  const poll = await prisma.poll.create({
    data: {
      title: data.title,
      description: data.description,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      public: data.public ?? true,
      authorId: user.id,

      questions: {
        create: data.questions.map((question) => ({
          title: question.title,

          options: {
            create: question.options
              .filter((option) => option.trim() !== "")
              .map((option) => ({
                text: option,
              })),
          },
        })),
      },
    },

    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  const validEmails = (data.invites ?? [])
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email !== "");

  if (validEmails.length > 0) {
    await prisma.pollInvite.createMany({
      data: validEmails.map((email) => ({
        pollId: poll.id,
        email,
      })),
      skipDuplicates: true,
    });
  }

  return poll;
}

export async function updatePoll(
  pollId: string,
  data: {
    title: string;
    description: string;
    expiresAt?: string | null;
    public?: boolean;
    questions: {
      id?: string;
      title: string;
      options: {
        id?: string;
        text: string;
      }[];
    }[];
  }
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Trebuie să fii autentificat.");
  }

  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: {
      author: true,
      questions: {
        include: { options: true },
      },
    },
  });

  if (!poll) {
    throw new Error("Sondajul nu există.");
  }

  if (poll.author.clerkId !== userId) {
    throw new Error("Nu ai voie să editezi acest sondaj.");
  }

  await prisma.poll.update({
    where: { id: pollId },
    data: {
      title: data.title,
      description: data.description,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      public: data.public ?? poll.public,
    },
  });

  const existingQuestionIds = poll.questions.map((q) => q.id);
  const submittedQuestionIds = data.questions
    .filter((q) => q.id)
    .map((q) => q.id as string);

  const questionsToDelete = existingQuestionIds.filter(
    (id) => !submittedQuestionIds.includes(id)
  );

  if (questionsToDelete.length > 0) {
    await prisma.pollQuestion.deleteMany({
      where: { id: { in: questionsToDelete } },
    });
  }

  for (const question of data.questions) {
    if (question.id) {
      await prisma.pollQuestion.update({
        where: { id: question.id },
        data: { title: question.title },
      });

      const existingOptions =
        poll.questions.find((q) => q.id === question.id)?.options ?? [];

      const existingOptionIds = existingOptions.map((o) => o.id);
      const submittedOptionIds = question.options
        .filter((o) => o.id)
        .map((o) => o.id as string);

      const optionsToDelete = existingOptionIds.filter(
        (id) => !submittedOptionIds.includes(id)
      );

      if (optionsToDelete.length > 0) {
        await prisma.pollOption.deleteMany({
          where: { id: { in: optionsToDelete } },
        });
      }

      for (const option of question.options) {
        if (!option.text.trim()) continue;

        if (option.id) {
          await prisma.pollOption.update({
            where: { id: option.id },
            data: { text: option.text },
          });
        } else {
          await prisma.pollOption.create({
            data: {
              text: option.text,
              questionId: question.id,
            },
          });
        }
      }
    } else {
      await prisma.pollQuestion.create({
        data: {
          title: question.title,
          pollId: pollId,
          options: {
            create: question.options
              .filter((o) => o.text.trim() !== "")
              .map((o) => ({ text: o.text })),
          },
        },
      });
    }
  }

  

  return { success: true };
}

export async function deletePoll(pollId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Trebuie să fii autentificat.");
  }

  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: { author: true },
  });

  if (!poll) {
    throw new Error("Sondajul nu există.");
  }

  if (poll.author.clerkId !== userId) {
    throw new Error("Nu ai voie să ștergi acest sondaj.");
  }

  await prisma.poll.delete({
    where: { id: pollId },
  });

  return { success: true };
}