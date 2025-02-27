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
- Git (for cloning the repository)
- 4GB+ of RAM recommended
- Ports 5173 and 3000 available on your machine

### Running with Docker

1. Clone the repository:
```bash
git clone https://github.com/zvan92/text-adventure-maker.git
cd text-adventure-maker
```

2. Start the application:
```bash
docker-compose up --build
```

3. Open your browser and navigate to:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Deployment with Docker

1. Install Docker on your server:
```bash
# For Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Windows Deployment

1. Install Docker Desktop for Windows:
   - Download Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
   - Run the installer and follow the prompts
   - Ensure WSL 2 is installed when prompted (Docker Desktop will help with this)
   - Restart your computer after installation

2. Configure Docker Desktop:
   - Start Docker Desktop
   - Wait for the Docker engine to start (whale icon in system tray turns solid)
   - Open Docker Desktop settings:
     - Set memory allocation (recommended: 4GB or more)
     - Enable WSL 2 based engine
     - Apply & Restart

3. Clone and prepare the application:
```powershell
# Clone the repository
git clone https://github.com/zvan92/text-adventure-maker.git
cd text-adventure-maker

# Create .env file (PowerShell)
New-Item .env -Type File
```

4. Configure environment variables (optional):
   - Open `.env` in your text editor and add:
```env
MONGODB_PORT=27017
FRONTEND_PORT=5173
BACKEND_PORT=3000
```

5. Deploy the application:
```powershell
# Start in detached mode for production
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop the application
docker-compose down

# Stop and remove volumes (warning: this will delete all data)
docker-compose down -v
```

6. Managing Windows deployment:
```powershell
# Check container status
docker-compose ps

# Restart containers
docker-compose restart

# Update to latest version
git pull
docker-compose up -d --build

# Create MongoDB backup
docker-compose exec -T mongodb mongodump --archive > backup.archive

# Restore MongoDB backup
type backup.archive | docker-compose exec -T mongodb mongorestore --archive
```

7. Troubleshooting Windows Deployment:
   - If Docker Desktop fails to start:
     - Open Windows Features and ensure "Virtual Machine Platform" and "Windows Subsystem for Linux" are enabled
     - Run `wsl --update` in PowerShell as administrator
   - If ports are in use:
     - Check port usage: `netstat -ano | findstr "5173 3000 27017"`
     - Stop conflicting services or change ports in `.env`
   - If containers fail to start:
     - Check Docker Desktop is running
     - View logs in Docker Desktop dashboard
     - Run `docker-compose down` then `docker-compose up --build`
   - If WSL 2 issues occur:
     - Open PowerShell as administrator and run:
       ```powershell
       wsl --shutdown
       wsl --update
       ```
     - Restart Docker Desktop

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
