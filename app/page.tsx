import Link from "next/link";
import PollCard from "@/components/home/PollCard";

const steps = [
  {
    n: "01",
    title: "Creezi sondajul",
    text: "Scrii intrebarea si optiunile pentru vot.",
  },
  {
    n: "02",
    title: "Trimiti link-ul",
    text: "Distribui link-ul prietenilor fara ca acestia sa isi faca un cont.",
  },
  {
    n: "03",
    title: "Voteaza si comenteaza",
    text: "Fiecare poate vota o singura data si poate lasa un comentariu.",
  },
  {
    n: "04",
    title: "Vezi rezultatele",
    text: "Rezultatele se actualizeaza in timp real pana inchizi sondajul.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-coral">
            Friend Poll
          </span>

          <h1 className="mt-4 font-display text-5xl font-bold leading-tight">
            Prietenii tai nu se pot decide?
            <br />
            Lasa-i sa voteze.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-ink/70">
            Creeaza un sondaj in cateva secunde, distribuie link-ul si vezi
            rezultatele in timp real. Simplu, rapid si gratuit.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/poll/new"
              className="rounded-full bg-coral px-6 py-3 font-mono text-sm text-white transition hover:opacity-90"
            >
              Creeaza un sondaj
            </Link>

            {/* <Link
              href="/sign-in"
              className="rounded-full border border-line px-6 py-3 font-mono text-sm transition hover:bg-paper"
            >
              Conecteaza-te
            </Link> */}
          </div>
        </div>

        <div className="flex justify-center">
          <PollCard />
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl font-bold text-center">
            Cum functioneaza
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-line p-6 shadow-sm"
              >
                <span className="font-mono text-coral">{step.n}</span>

                <h3 className="mt-3 font-display text-lg font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-ink/70">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl font-bold">
          Gata cu discutiile fara sfarsit.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-ink/70">
          Friend Poll te ajuta sa iei decizii impreuna cu prietenii tai prin
          sondaje rapide si rezultate actualizate instant.
        </p>

        {/* <Link
          href="/poll/new"
          className="mt-8 inline-block rounded-full bg-ink px-8 py-3 font-mono text-paper transition hover:bg-coral"
        >
          Incepe
        </Link> */}
      </section>
    </main>
  );
}