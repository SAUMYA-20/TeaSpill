TeaSpill – Microservices MERN Gossip Platform

TeaSpill is a production-ready microservices-based MERN stack application where users can:

🔐 Register & Login

☕ Post “Tea” (gossip)

🔥 Like / ❄ Dislike tea

🌡 Rate hotness

💬 Comment on tea

🌙 Toggle Dark / Light theme

🚦 Rate limited via Nginx

🐳 Fully Dockerized

🏗 Architecture
Client (React + Tailwind)
        ↓
Nginx (Reverse Proxy + Rate Limiting + Load Balancing)
        ↓
Auth Service (JWT)
Tea Service (CRUD)
        ↓
MongoDB
🧱 Tech Stack
Frontend

React (Vite)

TailwindCSS

Axios

React Router

Backend

Node.js

Express

MongoDB

Mongoose

JWT Authentication

DevOps

Docker

Docker Compose

Nginx Reverse Proxy

Rate Limiting (10 req/sec per IP)

📁 Project Structure
teaspill/
│
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
│
├── client/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── services/
│   ├── auth/
│   │   ├── Dockerfile
│   │   ├── server.js
│   │   └── routes/
│   │
│   └── tea/
│       ├── Dockerfile
│       ├── server.js
│       └── routes/
│
└── README.md
🚀 How To Run
🐳 Run Full Production Setup

From project root:

docker compose down -v
docker compose up --build

Open:

http://localhost
🛑 Stop Project
docker compose down
🔌 Services
1️⃣ Auth Service

Port: 5000
Base Route: /api/auth

Endpoints
POST   /api/auth/register
POST   /api/auth/login

Uses JWT authentication.

2️⃣ Tea Service

Port: 5001
Base Route: /api/tea

Endpoints
GET    /api/tea
POST   /api/tea
POST   /api/tea/:id/like
POST   /api/tea/:id/dislike
POST   /api/tea/:id/rate

Requires JWT for creating tea.

🗄 MongoDB

Database name:

teaspill

Collections:

users
teas
View Mongo Inside Docker
docker exec -it teaspill-mongo mongosh
use teaspill
db.teas.find().pretty()
🔐 Authentication Flow

User registers

User logs in

Backend returns JWT

Token stored in localStorage

Axios interceptor attaches token

Protected routes verify JWT

🌙 Theme System

Green / Brown / Yellow tea palette

Light & Dark mode toggle

Glassmorphism UI

Fully responsive

Theme controlled via:

document.documentElement.classList.add("light" | "dark")
🚦 Nginx Configuration

Reverse Proxy

Rate limiting (10 req/sec per IP)

Load balancing ready

Single origin → No CORS issues

Rate limit config:

limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
🛡 Production Features

Microservices architecture

Dockerized environment

Clean separation of concerns

JWT authentication

Rate limiting

Reverse proxy

Dark/light theme

Persistent Mongo volume

No CORS problems

⚙ Environment Variables

Configured via docker-compose:

MONGO_URI=mongodb://mongodb:27017/teaspill
JWT_SECRET=supersecret
NODE_ENV=production
🧠 Common Debug Commands
Check running containers
docker ps
Check logs
docker compose logs
docker compose logs tea-service
docker compose logs auth-service
docker compose logs nginx
Rebuild clean
docker compose down -v
docker compose build --no-cache
docker compose up
📈 Future Improvements

Redis caching

API Gateway service

Role-based access control

Pagination & infinite scroll

WebSocket live comments

HTTPS + SSL (Certbot)

Mongo authentication

CI/CD pipeline

Kubernetes deployment

👩‍💻 Author

TeaSpill – Microservices MERN Production App
Built with scalable architecture and clean separation.