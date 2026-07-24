<<<<<<< HEAD
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
=======
import PollCard from "@/components/PollCard";

const steps = [
  {
    n: "01",
    title: "Creezi sondajul",
    text: "Scrii intrebarea si optiunile - de la restaurant pana la destinatia de weekend.",
  },
  {
    n: "02",
    title: "Trimiti link-ul",
    text: "Distribui link-ul prietenilor prin email sau direct, fara sa le ceri sa-si faca cont.",
  },
  {
    n: "03",
    title: "Votati si comentati",
    text: "Fiecare voteaza o singura data si poate lasa un comentariu pe marginea optiunilor.",
  },
  {
    n: "04",
    title: "Vedeti rezultatul",
    text: "Rezultatele se actualizeaza live, iar tu inchizi sondajul cand decizia e clara.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-bold">Friend Poll</span>
        <a
          href="#cta"
          className="font-mono text-sm text-ink/70 underline decoration-line underline-offset-4 hover:text-coral"
        >
          creeaza un sondaj &rarr;
        </a>
      </header>

      <main>
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
              Creezi un sondaj, trimiti link-ul grupului, iar fiecare voteaza
              o singura data si poate lasa un comentariu. Rezultatele apar in
              timp real, iar tu inchizi sondajul cand s-a decis ceva.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                id="cta"
                href="#"
                className="rounded-full bg-ink px-6 py-3 font-mono text-sm text-paper transition hover:bg-coral"
              >
                Creeaza primul sondaj
              </a>
              <span className="font-mono text-xs text-ink/50">
                fara cont necesar pentru votanti
              </span>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <PollCard />
          </div>
        </section>

        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="font-display text-2xl font-bold">Cum functioneaza</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n}>
                  <span className="font-mono text-sm text-coral">{s.n}</span>
                  <h3 className="mt-2 font-display text-base font-bold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Gata cu grupurile de WhatsApp
            <br className="hidden md:block" /> care nu ajung la o concluzie.
          </h2>
          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-coral px-8 py-3 font-mono text-sm text-white transition hover:opacity-90"
          >
            Incepe un sondaj gratuit
          </a>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 font-mono text-xs text-ink/50 md:flex-row">
          <span>Friend Poll - proiect universitar, ULBS</span>
          <span>construit cu Next.js</span>
        </div>
      </footer>
>>>>>>> b671b8a2f864b4268404569df921beaa181e1ac7
    </div>
  );
}
