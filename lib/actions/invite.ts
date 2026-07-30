"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function assertOwner(pollId: string, userId: string) {
  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: { author: true },
  });

  if (!poll) {
    throw new Error("Sondajul nu există.");
  }

  if (poll.author.clerkId !== userId) {
    throw new Error("Nu ai voie să modifici acest sondaj.");
  }

  return poll;
}

export async function addInvite(pollId: string, email: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Trebuie să fii autentificat.");
  }

  await assertOwner(pollId, userId);

  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Introdu un email valid.");
  }

  await prisma.pollInvite.upsert({
    where: {
      pollId_email: {
        pollId,
        email: normalizedEmail,
      },
    },
    update: {},
    create: {
      pollId,
      email: normalizedEmail,
    },
  });

  return { success: true };
}

export async function removeInvite(pollId: string, inviteId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Trebuie să fii autentificat.");
  }

  await assertOwner(pollId, userId);

  await prisma.pollInvite.delete({
    where: { id: inviteId },
  });

  return { success: true };
}