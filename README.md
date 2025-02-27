# Text Adventure Maker

A web application for creating and playing interactive text adventures. Built with React, TypeScript, Material-UI, and MongoDB.

## Features

- Create and edit text adventures with multiple nodes and choices
- Visual editor for managing story nodes and connections
- Play through created adventures
- Dark mode interface
- Persistent storage using MongoDB
- Docker containerization for easy deployment

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - Vite

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

- Infrastructure:
  - Docker
  - Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

### Running with Docker

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/text-adventure-maker.git
cd text-adventure-maker
```

2. Start the application:
```bash
docker-compose up --build
```

3. Open your browser and navigate to:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Local Development

1. Install dependencies:
```bash
npm install
cd backend && npm install
```

2. Start the development server:
```bash
npm run dev
```

3. In another terminal, start the backend:
```bash
cd backend && npm run dev
```

## Project Structure

- `/src` - Frontend React application
  - `/components` - React components
  - `/types` - TypeScript type definitions
  - `/services` - API services

- `/backend` - Node.js/Express backend
  - `/src` - Backend source code
  - `/models` - Mongoose models

## Docker Configuration

The project includes three Docker containers:
1. Frontend (React/Vite)
2. Backend (Node.js/Express)
3. MongoDB

Data is persisted using a Docker volume for MongoDB.

## License

MIT License - feel free to use this project for your own purposes.
