import Link from "next/link";

type PreviewOption = {
  text: string;
  votes: number;
};

type PollCardProps = {
  id: string;
  title: string;
  description: string | null;
  questionsCount: number;
  createdAt: Date;
  expiresAt?: Date | null;
  isPublic?: boolean;
  previewOptions?: PreviewOption[];
  showEditButton?: boolean;
};

export default function PollCard({
  id,
  title,
  description,
  questionsCount,
  createdAt,
  expiresAt,
  isPublic,
  previewOptions = [],
  showEditButton = true,
}: PollCardProps) {
  const totalVotes = previewOptions.reduce((sum, o) => sum + o.votes, 0);
  const maxVotes = Math.max(0, ...previewOptions.map((o) => o.votes));

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>

        {typeof isPublic === "boolean" && (
          <span
            className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${
              isPublic
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {isPublic ? "🌍 Public" : "🔒 Privat"}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-gray-600">{description}</p>
      )}

      <div className="mt-4 space-y-1 text-sm text-gray-500">
        <p>📋 {questionsCount} întrebări</p>
        <p>📅 {createdAt.toLocaleDateString("ro-RO")}</p>
        {expiresAt && (
          <p>⏰ Expiră: {new Date(expiresAt).toLocaleDateString("ro-RO")}</p>
        )}
      </div>

      {previewOptions.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {previewOptions.map((option, i) => {
            const percentage =
              totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);
            const isLeading = option.votes === maxVotes && totalVotes > 0;

            return (
              <div key={i}>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className={isLeading ? "font-semibold" : ""}>
                    {option.text}
                  </span>
                  <span>{percentage}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full ${
                      isLeading ? "bg-blue-600" : "bg-gray-400"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
          {totalVotes === 0 && (
            <p className="text-xs text-gray-400 italic">Fără voturi încă</p>
          )}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Link
          href={`/poll/${id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Vezi
        </Link>

        {showEditButton && (
          <Link
            href={`/poll/${id}/edit`}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Editează
          </Link>
        )}
      </div>
    </div>
  );
}