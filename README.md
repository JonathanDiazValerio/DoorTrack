# DoorTrack

A modern full-stack TypeScript application for door tracking, built with React, Express, Vite, and Drizzle ORM.

## Features
- Monorepo structure: client, server, and shared code
- Frontend: React, Tailwind CSS, Radix UI, Framer Motion
- Backend: Express.js, Drizzle ORM, Passport authentication
- Database: PostgreSQL (Neon), session management
- TypeScript throughout
- Hot-reloading in development via Vite

## Getting Started

### Prerequisites
- Node.js (v20.x LTS recommended)
- npm

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/JonathanDiazValerio/DoorTrack
   cd DoorTrack/DoorTrack
   ```
2. Install dependencies:
   ```
   npm install
   ```

### Development
Start the development server:
```
npm run dev
```
Visit [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

### Production
Build and start the app:
```
npm run build
npm start
```

## Troubleshooting
- If you see `ENOTSUP` errors, ensure you are using Node.js v20.x and the server is listening on `127.0.0.1`.
- Remove `reusePort` from server options for Windows compatibility.

## License
MIT
