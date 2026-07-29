"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function addComment(
  pollId: string,
  text: string
) {
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

  await prisma.comment.create({
    data: {
      pollId,
      text,
      author: user.name || user.email || "Anonim",
    },
  });

  return {
    success: true,
  };
}