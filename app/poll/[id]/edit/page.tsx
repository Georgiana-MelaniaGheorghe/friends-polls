import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import EditPollForm from "@/components/poll/EditPollForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPollPage({ params }: Props) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const poll = await prisma.poll.findUnique({
    where: { id },
    include: {
      author: true,
      questions: {
        include: {
          options: {
            include: {
              _count: { select: { votes: true } },
            },
          },
        },
      },
      invites: true,
    },
  });

  if (!poll) {
    notFound();
  }

  if (poll.author.clerkId !== userId) {
    redirect(`/poll/${id}`);
  }

  return (
    <EditPollForm
      pollId={poll.id}
      initialTitle={poll.title}
      initialDescription={poll.description ?? ""}
      initialExpiresAt={
        poll.expiresAt
          ? new Date(poll.expiresAt).toISOString().slice(0, 16)
          : ""
      }
      initialPublic={poll.public}
      initialQuestions={poll.questions.map((q) => ({
        id: q.id,
        title: q.title,
        options: q.options.map((o) => ({
          id: o.id,
          text: o.text,
          voteCount: o._count.votes,
        })),
      }))}
      initialInvites={poll.invites.map((i) => ({
        id: i.id,
        email: i.email,
      }))}
    />
  );
}