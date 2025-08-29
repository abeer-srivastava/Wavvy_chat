

---

# 🌊 Wavvy Chat

**Wavvy Chat** is a modern **real-time chat application** built in a **Turborepo monorepo architecture**, featuring:

* **Frontend:** Next.js + Tailwind + shadcn/ui
* **Backend (HTTP):** Express + Prisma + PostgreSQL
* **Backend (WebSocket):** WebSocket server for real-time messaging

It is modular, scalable, and designed for production-ready chat applications.

---

## 📸 Screenshots



```
docs/
  screenshots/
    chat-ui.png
    login.png
    rooms.png
```

Then, reference them in your `README.md` like this:

```md
### 💬 Landing page
![Landing Page](apps/wavy-fe/public/Landing.png)

### 🔐 Chat Ui
![LightChat Ui](apps/wavy-fe/public/LightChat.png)
![DarkChat Ui](apps/wavy-fe/public/DarkChat.png)

```

---

## 🏗️ Monorepo Structure

```
wavvychat/
├── apps/
│   ├── http-server/      # Express / API server
│   ├── wavy-fe/          # Next.js frontend app
│   └── ws-server/        # WebSocket server
│
├── packages/
│   ├── backend-comman/   # Shared backend utilities
│   ├── comman/           # Shared logic/constants
│   ├── db/               # Prisma + Database client
│   ├── eslint-config/    # Shared ESLint config
│   ├── typescript-config/# Shared TS configs
│   └── ui/               # Shared UI components (shadcn/ui + custom)
│
├── docs/                 # Documentation & screenshots
├── .turbo/               # Turborepo build cache
├── turbo.json            # Turborepo config
├── package.json          # Root package
├── tsconfig.json         # Base TS config
└── README.md             # Project documentation
```

---

## 🚀 Features

* 🔐 **Authentication & Authorization** with NextAuth.js
* 💬 **Real-time Messaging** using WebSockets
* 🧑‍🤝‍🧑 **Room-based Chats** (private & group)
* 📨 **Optimistic UI Updates** for instant feedback
* 🗄️ **Persistent Storage** with Prisma ORM + PostgreSQL
* 🎨 **Reusable UI Components** with Tailwind & shadcn/ui
* ⚡ **Monorepo Architecture** with Turborepo

---

## 📦 Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/wavvy-chat.git
cd wavvy-chat
```

### 2️⃣ Install dependencies

```bash
pnpm install   # or yarn install / npm install
```

### 3️⃣ Configure Environment Variables

Create `.env` in root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/wavvychat"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4️⃣ Setup Database

```bash
pnpm db:migrate
```

### 5️⃣ Run Development Servers

```bash
# Run all apps in parallel
pnpm dev

# OR run specific apps
pnpm dev --filter wavy-fe
pnpm dev --filter http-server
pnpm dev --filter ws-server
```

---

## 📁 Project Architecture Diagram

```mermaid
flowchart TD
    FE[Next.js Frontend] -->|REST / GraphQL| HTTP[HTTP Server (Express + Prisma)]
    FE -->|WebSockets| WS[WebSocket Server]

    HTTP --> DB[(PostgreSQL Database)]
    WS --> DB

    subgraph Turborepo
        FE
        HTTP
        WS
        Shared[Shared Packages (db, ui, config)]
    end
```

---

## 🧪 Scripts

```bash
pnpm dev        # Start all apps in dev mode
pnpm build      # Build all apps
pnpm lint       # Run lint checks
pnpm db:studio  # Open Prisma Studio
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m "feat: add new feature"`)
4. Push branch (`git push origin feature/new-feature`)
5. Open a Pull Request 🚀

---

## 📜 License

MIT License © 2025 — Abeer Srivastava

---
