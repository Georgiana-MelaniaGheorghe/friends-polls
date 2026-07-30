import { notFound } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import VoteButton from "@/components/poll/VoteButton";
import CommentForm from "@/components/poll/CommentForm";
import CopyLinkButton from "@/components/poll/CopyLinkButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PollPage({ params }: Props) {
  const { id } = await params;
  const { userId } = await auth();

  const poll = await prisma.poll.findUnique({
    where: {
      id,
    },
   include: {
  questions: {
    include: {
      options: {
        include: {
          votes: true,
        },
      },
    },
  },
  comments: {
    orderBy: {
      createdAt: "desc",
    },
  },
  author: true,
  invites: true,
},
  });

  if (!poll) {
    notFound();
  }

  const isOwner = userId === poll.author.clerkId;

  let hasAccess = poll.public || isOwner;

  if (!hasAccess && userId) {
    const clerkUser = await currentUser();
    const userEmail = clerkUser?.primaryEmailAddress?.emailAddress?.toLowerCase();

    hasAccess = poll.invites.some((invite) => invite.email === userEmail);
  }

  if (!hasAccess) {
    if (!userId) {
      return (
        <main className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold">🔒 Sondaj privat</h1>
          <p className="mt-4 text-gray-600">
            Acest sondaj este privat. Autentifică-te cu adresa de email cu care ai fost invitat pentru a avea acces.
          </p>
          <a
            href={`/sign-in?redirect_url=/poll/${poll.id}`}
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Autentifică-te
          </a>
        </main>
      );
    }

    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">🔒 Sondaj privat</h1>
        <p className="mt-4 text-gray-600">
          Nu ai acces la acest sondaj. Cere autorului să te invite folosind adresa ta exactă de email.
        </p>
      </main>
    );
  }

  const isExpired = poll.expiresAt ? new Date() > new Date(poll.expiresAt) : false;
  const canVote = !poll.isClosed && !isExpired;
  const showResults = poll.showResultsImmediately || poll.isClosed || isExpired;

  function getPercentage(votes: number, total: number) {
    if (total === 0) return 0;

    return Math.round((votes / total) * 100);
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-4xl font-bold">{poll.title}</h1>
        {isOwner && <CopyLinkButton pollId={poll.id} />}
      </div>

      {poll.description && (
        <p className="mt-4 text-gray-600">
          {poll.description}
        </p>
      )}

      {!canVote && (
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800">
          {isExpired
            ? "⏰ Acest sondaj a expirat. Votarea este închisă."
            : "🔒 Acest sondaj este închis."}
        </div>
      )}

      {poll.expiresAt && !isExpired && (
        <p className="mt-2 text-sm text-gray-500">
          Expiră la: {new Date(poll.expiresAt).toLocaleString("ro-RO")}
        </p>
      )}

      <div className="mt-10 space-y-10">
        {poll.questions.map((question, index) => {
          const totalVotes = question.options.reduce(
            (sum, option) => sum + option.votes.length,
            0
          );

          return (
            <div
              key={question.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold">
                {index + 1}. {question.title}
              </h2>

              <div className="mt-5 space-y-5">
                {question.options.map((option) => (
                  <div key={option.id} className="space-y-2">
                    {canVote ? (
                      <VoteButton
                        optionId={option.id}
                        text={option.text}
                      />
                    ) : (
                      <div className="rounded-lg border px-4 py-3 text-gray-700 bg-gray-50">
                        {option.text}
                      </div>
                    )}

                    {showResults && (
                      <>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{
                              width: `${getPercentage(
                                option.votes.length,
                                totalVotes
                              )}%`,
                            }}
                          />
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{option.votes.length} voturi</span>

                          <span>
                            {getPercentage(
                              option.votes.length,
                              totalVotes
                            )}
                            %
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {!showResults && (
                <p className="mt-4 text-sm text-gray-500 italic">
                  Rezultatele vor fi vizibile după închiderea sondajului.
                </p>
              )}
            </div>
          );
        })}
      </div>
      <section className="mt-12 border-t pt-8">
  <h2 className="mb-6 text-2xl font-bold">
    Comentarii
  </h2>

  <CommentForm pollId={poll.id} />

  <div className="mt-8 space-y-4">
    {poll.comments.length === 0 ? (
      <p className="text-gray-500">
        Nu există comentarii încă.
      </p>
    ) : (
      poll.comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-lg border bg-white p-4 shadow-sm"
        >
          <p className="font-semibold">
            {comment.author}
          </p>

          <p className="mt-2 text-gray-700">
            {comment.text}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleString("ro-RO")}
          </p>
        </div>
      ))
    )}
  </div>
</section>
    </main>
  );
}