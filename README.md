# StudyNook 📚

A modern library study room booking platform built with Next.js and Express.js.

![StudyNook](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)
![HeroUI](https://img.shields.io/badge/HeroUI-v3-blue?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)

## 🌐 Live Demo

- **Client:** [studynook.vercel.app](https://studynook.vercel.app)
- **Server:** [studynook-server.onrender.com](https://studynook-server.onrender.com)

---

## ✨ Features

- 🔐 **Authentication** — Email/password + Google OAuth via Better Auth
- 🏠 **Browse Rooms** — Search by name, filter by amenities
- 📅 **Book a Room** — Time slot booking with conflict prevention
- ✏️ **Manage Listings** — Add, edit, delete your own rooms
- 📋 **My Bookings** — View and cancel your bookings
- 🔒 **Protected Routes** — JWT-based API security
- 📱 **Responsive** — Mobile-first design

---

## 🛠️ Tech Stack

### Frontend (Client)
| Technology | Purpose |
|-----------|---------|
| Next.js 16 | React framework with App Router |
| Tailwind CSS v4 | Utility-first styling |
| HeroUI v3 | UI component library |
| Better Auth | Authentication (Email + Google OAuth) |
| React Hot Toast | Toast notifications |

### Backend (Server)
| Technology | Purpose |
|-----------|---------|
| Express.js | REST API server |
| MongoDB + Mongoose | Database |
| JSON Web Token | API route protection |
| Nodemon | Development server |

---

## 📁 Project Structure

```
studynook-client/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/
│   │   │   ├── page.jsx          # Homepage
│   │   │   ├── rooms/            # All Rooms + Room Details
│   │   │   ├── add-room/         # Add Room form
│   │   │   └── my-bookings/      # User bookings
│   │   ├── api/
│   │   │   ├── auth/[...all]/    # Better Auth handler
│   │   │   └── token/            # JWT token generator
│   │   └── not-found.jsx         # 404 page
│   ├── components/
│   │   ├── shared/               # Navbar, Footer
│   │   ├── home/                 # Homepage sections
│   │   ├── rooms/                # Room components
│   │   └── bookings/             # Booking components
│   └── lib/
│       ├── auth.js               # Better Auth config
│       ├── auth-client.js        # Auth client
│       └── db.js                 # MongoDB connection

studynook-server/
├── controllers/
│   ├── room.controller.js
│   └── booking.controller.js
├── middleware/
│   └── verifyToken.js
├── models/
│   ├── Room.js
│   └── Booking.js
├── routes/
│   ├── room.routes.js
│   └── booking.routes.js
└── index.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials

### Client Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/studynook-client.git
cd studynook-client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Add the following to `.env.local`:

```env
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-here
MONGODB_URI=your-mongodb-uri
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret
```

```bash
# Run development server
npm run dev
```

### Server Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/studynook-server.git
cd studynook-server

# Install dependencies
npm install
```

Add the following to `.env`:

```env
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLIENT_URL=http://localhost:3000
```

```bash
# Run development server
npm run dev
```

---

## 🔗 API Endpoints

### Rooms
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/rooms` | ❌ | Get all rooms (with search & filter) |
| GET | `/api/rooms/:id` | ❌ | Get room by ID |
| POST | `/api/rooms` | ✅ | Create a new room |
| PUT | `/api/rooms/:id` | ✅ | Update room (owner only) |
| DELETE | `/api/rooms/:id` | ✅ | Delete room (owner only) |

### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/bookings` | ✅ | Create a booking |
| GET | `/api/bookings/my` | ✅ | Get my bookings |
| DELETE | `/api/bookings/:id` | ✅ | Cancel a booking |

---

## 📸 Screenshots

| Homepage | Rooms | Room Details |
|----------|-------|--------------|
| ![Home](./public/screenshots/home.png) | ![Rooms](./public/screenshots/rooms.png) | ![Details](./public/screenshots/details.png) |

---

## 👨‍💻 Author

**Kazi Md Mizanur Rahman**
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 📄 License

This project is for educational purposes — Assignment 09, Milestone 09.
