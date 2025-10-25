# 🌸 Sunlo — Real-Time Chat Application

**Sunlo** is a modern, real-time chat application built with the **MERN stack (MongoDB, Express.js, React, Node.js)** following the **MVC architecture**.  
It features user authentication, live messaging using **Socket.io**, and a beautiful **pink & cute-themed UI**.  
Perfect for friends, communities, or internal teams to chat instantly!

---

deployed Link : https://sunlo-gold.vercel.app/

## 🚀 Features

### Core Features
- 💬 Real-time one-on-one chat using **Socket.io**
- 🧠 Clean **MVC architecture**
- 🔐 Authentication (Signup, Signin, Logout)
- 👤 Profile editing and avatar management
- 🟢 Online/offline user status indicator
- 📱 Fully responsive UI (mobile-friendly)
- ⚙️ Secure password hashing using **bcrypt**
- 🪶 Beautiful pink & soft UI theme built with **Tailwind CSS**
- 📦 Persistent login using JWT stored in localStorage

### Future Enhancements
- 🧩 Group chat support
- 🕒 Message read receipts
- 🌙 Dark / Light mode toggle

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite), Redux Toolkit, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Real-Time Communication** | Socket.io |
| **Authentication** | JWT (JSON Web Token) |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v19+)
- **npm** or **yarn**
- **MongoDB** (Local or Atlas Cluster)
- **Git**

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/sunlo.git
cd sunlo
````

### 1️⃣ Setup Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run the backend server:

```bash
npm run dev
```

### 2️⃣ Setup Frontend (Client)

```bash
cd client
npm install
```

Create a `.env` file in the `client` folder:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

Start the React app:

```bash
npm run dev
```

---

## 🧑‍💻 Usage

1. Open your browser at [http://localhost:5173](http://localhost:5173)
2. Sign up or log in
3. Start chatting instantly with your friends!
4. Edit your profile, avatar, and see live updates

---

## 🏗️ Project Structure

```
sunlo/
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── pages/              # Signin, Signup, Chat, Profile
│   │   ├── components/         # UI components (Navbar, ChatBox, etc.)
│   │   ├── redux/              # Redux store & slices
│   │   ├── apicalls/           # API integration (axios)
│   │   ├── hooks/              # Custom hooks (useCurrentUser)
│   │   └── App.jsx             # Main app routes
│   └── vite.config.js
│
├── server/                     # Node.js Backend
│   ├── controllers/            # Business logic (Auth, Chat)
│   ├── models/                 # MongoDB models (User, Message)
│   ├── routes/                 # API routes
│   ├── utils/                  # JWT, Middleware, Helpers
│   ├── server.js               # Entry point
│   └── socket.js               # Socket.io configuration
│
└── README.md
```

---

## 🌐 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| `POST` | `/api/auth/signup`     | Register a new user                |
| `POST` | `/api/auth/signin`     | Authenticate user and return token |
| `PUT`  | `/api/auth/update/:id` | Update user profile                |
| `GET`  | `/api/auth/current`    | Get current logged-in user         |

### 💬 Chat Routes

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| `GET`  | `/api/messages/:chatId` | Get all messages of a chat  |
| `POST` | `/api/messages/send`    | Send a new message          |
| `GET`  | `/api/users`            | Get all users for chat list |

---

## ⚡ Socket.io Events

| Event             | Direction       | Description                |
| ----------------- | --------------- | -------------------------- |
| `connection`      | Server ↔ Client | User connected             |
| `join_room`       | Client → Server | Join a chat room           |
| `send_message`    | Client → Server | Emit new message           |
| `receive_message` | Server → Client | Broadcast received message |
| `disconnect`      | Server ↔ Client | User disconnected          |
| `user_online`     | Server → Client | Notify online users        |
| `user_offline`    | Server → Client | Notify offline users       |

---

## 🔑 Environment Variables

| Variable          | Location | Description               |
| ----------------- | -------- | ------------------------- |
| `PORT`            | Server   | Backend port              |
| `MONGO_URI`       | Server   | MongoDB connection string |
| `JWT_SECRET`      | Server   | Secret for JWT signing    |
| `CLIENT_URL`      | Server   | Frontend URL (CORS)       |
| `VITE_API_URL`    | Client   | Base URL for API requests |
| `VITE_SOCKET_URL` | Client   | Socket.io server URL      |

---

## 🌸 Features in Detail

### 💬 Real-Time Chat

* Built with **Socket.io**, ensuring messages are delivered instantly without refresh.
* Each chat session uses a unique `roomId` between users.

### 🧠 MVC Architecture

* Model: MongoDB schemas for users and messages.
* View: React-based UI.
* Controller: Express controllers handle routes & business logic.

### 🔐 Secure Authentication

* JWT-based system ensures user sessions are safe.
* Passwords are hashed using bcrypt before storage.

### 🎀 UI / UX

* Soft pink & white aesthetic using Tailwind CSS.
* Mobile-first responsive layout with smooth Framer Motion animations.

---

## 🧩 Troubleshooting

| Problem                  | Possible Cause                                  | Solution                                                                   |
| ------------------------ | ----------------------------------------------- | -------------------------------------------------------------------------- |
| `404 on refresh`         | React Router on Vercel                          | Add `rewrite` rule in `vercel.json` to redirect all paths to `/index.html` |
| `CORS error`             | Mismatched `CLIENT_URL` or missing CORS headers | Add `cors({ origin: CLIENT_URL, credentials: true })` in Express           |
| `Socket not connecting`  | Wrong `VITE_SOCKET_URL`                         | Ensure backend and socket are running on the same port                     |
| `JWT expired`            | Token timeout                                   | Re-login or refresh token manually                                         |
| `Build failed on Vercel` | Missing environment variables                   | Add all `.env` variables in Vercel dashboard                               |

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify for your own learning or personal projects.

---

## 🌈 Acknowledgments

* [Socket.io](https://socket.io/) for real-time features
* [Vite](https://vitejs.dev/) for fast development
* [Tailwind CSS](https://tailwindcss.com/) for styling
* [Render](https://render.com/) and [Vercel](https://vercel.com/) for hosting

---

> 💗 “Built with love, coffee, and friendship.” — Team Sunlo

```

---

Would you like me to make it **auto-formatted and styled** (with emojis, collapsible sections, and code highlighting for GitHub)?  
It’ll look beautiful when rendered directly on your repository page.
```
