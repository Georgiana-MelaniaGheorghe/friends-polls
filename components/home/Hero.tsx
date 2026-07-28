import Link from "next/link";
import PollCard from "./PollCard";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-coral">
          decizii de grup, fara bataie de cap
        </span>

        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-ink md:text-5xl">
          Prietenii tai nu se pot decide.
          <br />
          Lasa-i sa voteze.
        </h1>

        <p className="mt-5 max-w-md text-base text-ink/70 md:text-lg">
          Creezi un sondaj, trimiti link-ul grupului, iar fiecare voteaza o
          singura data si poate lasa un comentariu. Rezultatele apar in timp
          real, iar tu inchizi sondajul cand s-a decis ceva.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/poll/new"
            className="rounded-full bg-ink px-6 py-3 font-mono text-sm text-paper transition hover:bg-coral"
          >
            Creeaza primul sondaj
          </Link>

          <span className="font-mono text-xs text-ink/50">
            fara cont necesar pentru votanti
          </span>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <PollCard />
      </div>
    </section>
  );
}