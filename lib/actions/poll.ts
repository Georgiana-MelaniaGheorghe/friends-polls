"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function createPoll(data: {
  title: string;
  description: string;
  expiresAt?: string | null;
  public?: boolean;
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

  return poll;
}