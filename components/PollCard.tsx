type Option = {
  label: string;
  votes: number;
  color: string;
};

const options: Option[] = [
  { label: "Sushi la Nori", votes: 7, color: "bg-coral" },
  { label: "Pizza acasă", votes: 4, color: "bg-teal" },
  { label: "Ceva vegan nou", votes: 2, color: "bg-yellow" },
];

const total = options.reduce((sum, o) => sum + o.votes, 0);
const avatars = ["A", "M", "R", "D", "+9"];

export default function PollCard() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-[6px_6px_0_0_var(--ink)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
          sondaj activ
        </span>
        <span className="rounded-full bg-yellow/40 px-2.5 py-1 font-mono text-xs text-ink">
          se închide în 3h
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl font-bold text-ink">
        Unde mâncăm diseară?
      </h3>

      <div className="mt-5 space-y-3">
        {options.map((opt, i) => {
          const pct = Math.round((opt.votes / total) * 100);
          return (
            <div key={opt.label}>
              <div className="mb-1 flex items-baseline justify-between text-sm">
                <span className="text-ink">{opt.label}</span>
                <span className="font-mono text-ink/60">{opt.votes} voturi</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-paper">
                <div
                  className={`bar-animate h-full rounded-full ${opt.color}`}
                  style={{ width: `${pct}%`, animationDelay: `${i * 120}ms` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div className="flex -space-x-2">
          {avatars.map((a) => (
            <span
              key={a}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-ink font-mono text-[10px] text-paper"
            >
              {a}
            </span>
          ))}
        </div>
        <span className="font-mono text-xs text-ink/60">{total} au votat</span>
      </div>
    </div>
  );
}
