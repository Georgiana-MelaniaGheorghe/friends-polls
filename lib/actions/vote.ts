"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function vote(optionId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Trebuie să fii autentificat.");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new Error("Utilizatorul nu există.");
  }

  
  const option = await prisma.pollOption.findUnique({
    where: {
      id: optionId,
    },
    include: {
      question: {
        include: {
          poll: true,
          options: {
            include: {
              votes: true,
            },
          },
        },
      },
    },
  });

  if (!option) {
    throw new Error("Opțiunea nu există.");
  }

  const poll = option.question.poll;

  const isExpired = poll.expiresAt
    ? new Date() > new Date(poll.expiresAt)
    : false;

  if (poll.isClosed || isExpired) {
    throw new Error("Acest sondaj este închis și nu mai poate fi votat.");
  }

 
  let existingVote = null;

  for (const opt of option.question.options) {
    const vote = opt.votes.find(
      (v) => v.voterId === user.id
    );

    if (vote) {
      existingVote = vote;
      break;
    }
  }

  
  if (existingVote?.optionId === optionId) {
    return {
      success: true,
    };
  }


  if (existingVote) {
    await prisma.vote.update({
      where: {
        id: existingVote.id,
      },
      data: {
        optionId,
      },
    });

    return {
      success: true,
    };
  }

  
  await prisma.vote.create({
    data: {
      voterId: user.id,
      optionId,
    },
  });

  return {
    success: true,
  };
}