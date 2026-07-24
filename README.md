<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# 🗳️ Friend Poll

**Ia decizii de grup, rapid, fără bătăi de cap.**

Friend Poll este o aplicație web pentru grupuri de prieteni care trebuie să
ia rapid o decizie comună. Creatorul unui sondaj invită participanții prin
email sau printr-un link, fiecare votează o singură dată și poate lăsa un
comentariu, iar rezultatele sunt vizibile în timp real pentru toți. Sondajul
poate fi închis de creator odată ce decizia a fost luată.

**Demo live:** _(link Vercel — completează după deploy)_

---

## ✨ Funcționalități (plan)

- [ ] Creare sondaj (întrebare + opțiuni multiple)
- [ ] Invitare participanți prin email / link public
- [ ] Un singur vot per participant
- [ ] Comentarii pe marginea sondajului
- [ ] Rezultate live (actualizare în timp real)
- [ ] Închidere sondaj de către creator

## 🧱 Stack tehnic

| Zonă             | Tehnologie                          |
|------------------|--------------------------------------|
| Framework        | [Next.js](https://nextjs.org) 15 (App Router) |
| Limbaj           | TypeScript                          |
| Stilizare        | Tailwind CSS                        |
| Autentificare    | _de stabilit_ (ex. Clerk)           |
| Bază de date     | _de stabilit_ (ex. Supabase)        |
| Deploy           | Vercel                              |

## 📁 Structura proiectului

```
friend-poll/
├── app/                # Rute și pagini (App Router)
│   ├── layout.tsx
│   ├── page.tsx         # Landing page
│   └── globals.css
├── components/          # Componente UI reutilizabile
├── lib/                 # Utilitare, clienți (DB, auth), helpers
└── public/               # Assets statice
```

## 🚀 Development local

```bash
npm install
npm run dev
```

Aplicația pornește pe [http://localhost:3000](http://localhost:3000).

## 🌱 Branch-uri

- `main` — cod stabil, protejat (merge doar prin Pull Request)
- `dev` — dezvoltare activă

## 📌 Status

Proiect în curs de dezvoltare, realizat în cadrul cursurilor de la ULBS.
Aceasta este prima versiune: structura de bază + landing page inițial.
>>>>>>> b671b8a2f864b4268404569df921beaa181e1ac7
