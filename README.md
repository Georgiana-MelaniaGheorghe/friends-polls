
# 🗳️ Friend Poll

**O aplicație web pentru crearea și gestionarea sondajelor de grup.**

Friend Poll este o aplicație web pentru grupuri de prieteni care trebuie să
ia rapid o decizie comună. Creatorul unui sondaj invită participanții prin
email sau printr-un link, fiecare votează o singură dată și poate lăsa un
comentariu, iar rezultatele sunt vizibile în timp real pentru toți. Sondajul
poate fi închis de creator odată ce decizia a fost luată.

**🌐 Live Demo:** https://friends-polls.vercel.app

---

## ✨ Funcționalități

- ✅ Autentificare cu Clerk
- ✅ Creare sondaje cu:
  - titlu
  - descriere
  - mai multe întrebări
  - mai multe opțiuni
- ✅ Sondaje publice
- ✅ Sondaje private cu invitații prin email
- ✅ Data de expirare a sondajelor
- ✅ Un singur vot pentru fiecare întrebare
- ✅ Posibilitatea schimbării votului
- ✅ Comentarii la sondaje
- ✅ Dashboard pentru gestionarea sondajelor
- ✅ Copiere rapidă a link-ului sondajului
- ✅ Interfață responsive

## 🧱 Stack tehnic

| Zonă             | Tehnologie                           |
|------------------|--------------------------------------|
| Framework        | Next.js                              |
| Limbaj           | TypeScript                           |
| Stilizare/UI     | Tailwind CSS                         |
| ORM              |   Prisma                             |
|Autentificare     |  Clerk                               |
| Bază de date     |  PostgreSQL(Supabase)                |
| Deploy           | Vercel                               |


## 🚀 Rulare locală

Clonează proiectul:

```bash
git clone https://github.com/Georgiana-MelaniaGheorghe/friends-polls.git
```

Intră în proiect:

```bash
cd friends-polls
```

Instalează dependințele:

```bash
npm install
```

Configurează fișierul `.env`:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=
```

Actualizează baza de date:

```bash
npx prisma db push
```

Generează Prisma Client:

```bash
npx prisma generate
```

Pornește aplicația:

```bash
npm run dev
```

Aplicația va fi disponibilă la:

```
http://localhost:3000
```

---

## 📸 Capturi de ecran

### Home

<img width="795" height="780" alt="image" src="https://github.com/user-attachments/assets/8d9f4c43-ec18-4355-8b97-80a8374c45ca" />


### Dashboard

<img width="848" height="700" alt="image" src="https://github.com/user-attachments/assets/92871c85-a0ab-48ab-bd2a-241b647f4cc3" />


### Create Poll

<img width="815" height="765" alt="image" src="https://github.com/user-attachments/assets/54d5e1d4-586d-4fbc-b6d6-0cf305932dda" />


---

## 👩‍💻 Autor

**Georgiana-Melania Gheorghe **


