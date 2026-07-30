import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import PollCard from "@/components/poll/PollCard";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    return (
      <main className="mx-auto max-w-6xl p-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="mt-6 text-gray-600">
          Nu ai creat încă niciun sondaj.
        </p>
      </main>
    );
  }

  const polls = await prisma.poll.findMany({
    where: {
      authorId: user.id,
    },

    include: {
      _count: {
        select: { questions: true },
      },
      questions: {
        take: 1,
        include: {
          options: {
            include: {
              _count: { select: { votes: true } },
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const invitedPolls = user.email
    ? await prisma.poll.findMany({
        where: {
          authorId: { not: user.id },
          invites: {
            some: {
              email: user.email.toLowerCase(),
            },
          },
        },

        include: {
          _count: {
            select: { questions: true },
          },
          questions: {
            take: 1,
            include: {
              options: {
                include: {
                  _count: { select: { votes: true } },
                },
              },
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  function buildPreview(poll: (typeof polls)[number]) {
    const firstQuestion = poll.questions[0];

    return firstQuestion
      ? firstQuestion.options.map((o) => ({
          text: o.text,
          votes: o._count.votes,
        }))
      : [];
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Sondajele create de tine.
          </p>
        </div>

        <Link
          href="/poll/new"
          className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
        >
          + Creează sondaj
        </Link>
      </div>

      {polls.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <h2 className="text-2xl font-semibold">
            Nu ai încă niciun sondaj.
          </h2>

          <p className="mt-3 text-gray-500">
            Creează primul tău sondaj folosind butonul de mai sus.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {polls.map((poll) => (
            <PollCard
              key={poll.id}
              id={poll.id}
              title={poll.title}
              description={poll.description}
              questionsCount={poll._count.questions}
              createdAt={poll.createdAt}
              expiresAt={poll.expiresAt}
              isPublic={poll.public}
              previewOptions={buildPreview(poll)}
            />
          ))}
        </div>
      )}

      {invitedPolls.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-2 text-2xl font-bold">
            Sondaje la care ai acces
          </h2>

          <p className="mb-6 text-gray-600">
            Sondaje private la care ai fost invitat/ă.
          </p>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {invitedPolls.map((poll) => (
              <PollCard
                key={poll.id}
                id={poll.id}
                title={poll.title}
                description={poll.description}
                questionsCount={poll._count.questions}
                createdAt={poll.createdAt}
                expiresAt={poll.expiresAt}
                isPublic={poll.public}
                previewOptions={buildPreview(poll)}
                showEditButton={false}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}