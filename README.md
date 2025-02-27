# Text Adventure Maker

Create and play interactive text adventures with a visual editor.

## Quick Start

### Windows

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Open PowerShell and run:
```powershell
git clone https://github.com/zvan92/text-adventure-maker.git
cd text-adventure-maker
docker-compose up --build
```
3. Open http://localhost:5173 in your browser

### Linux

1. Install Docker:
```bash
curl -fsSL https://get.docker.com | sh
sudo systemctl start docker
```

2. Run the app:
```bash
git clone https://github.com/zvan92/text-adventure-maker.git
cd text-adventure-maker
docker-compose up --build
```

3. Open http://localhost:5173 in your browser

## Stopping the App

Press Ctrl+C in the terminal or run:
```bash
docker-compose down
```

## Troubleshooting

- **Docker not starting?** Restart Docker Desktop (Windows) or run `sudo systemctl restart docker` (Linux)
- **Port in use?** Change ports in `.env` file
- **Need help?** Open an issue on GitHub
