import Link from "next/link";

type PollCardProps = {
  id: string;
  title: string;
  description: string | null;
  questionsCount: number;
  createdAt: Date;
};

export default function PollCard({
  id,
  title,
  description,
  questionsCount,
  createdAt,
}: PollCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="text-2xl font-bold">{title}</h2>

      {description && (
        <p className="mt-2 text-gray-600">{description}</p>
      )}

      <div className="mt-4 space-y-1 text-sm text-gray-500">
        <p>📋 {questionsCount} întrebări</p>
        <p>
          📅 {createdAt.toLocaleDateString("ro-RO")}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/poll/${id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Vezi
        </Link>

        <Link
          href={`/poll/${id}/edit`}
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          Editează
        </Link>
      </div>
    </div>
  );
}