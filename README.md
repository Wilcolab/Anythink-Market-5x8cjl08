# Anythink Market — Dev Services

This workspace contains two simple development services:

- Python FastAPI service (python-server) — listens on port 8000
  - Source: python-server/src/main.py
- Node Express service (node-server) — listens on port 8001
  - Source: node-server/src/index.js
  - Uses nodemon for live reload (yarn start / npm run start runs nodemon)

A docker-compose.yml is provided to run both services together for development.

## Quick start (recommended — Docker Compose)

1. From repository root:
   - docker-compose up --build
2. Access:
   - Python API: http://localhost:8000
   - Node API: http://localhost:8001
3. Run in background:
   - docker-compose up -d --build
4. Stop and remove:
   - docker-compose down

## Local development (without Docker)

Node service:
1. cd node-server
2. Install deps:
   - npm install
   - or yarn
3. Start dev server (nodemon):
   - npm run start
   - or yarn start
4. Visit: http://localhost:8001

Python service:
1. cd python-server
2. (optional) venv:
   - python3 -m venv .venv && source .venv/bin/activate
3. Install:
   - pip install -r requirements.txt
4. Start dev server:
   - uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
5. Visit: http://localhost:8000

## Docker (individual services)

Node:
- docker build -t node-server ./node-server
- docker run -p 8001:8001 node-server

Python:
- docker build -t python-server ./python-server
- docker run -p 8000:8000 python-server

## Notes & tips

- The Node endpoints are direct translations of the FastAPI routes:
  - GET / -> "Hello World"
  - GET /tasks -> returns task list
  - POST /tasks -> accepts JSON { "text": "..." } and appends to list
- Use nodemon (start script) plus docker-compose volume mounts on node-server/src for live reload.
- Avoid overwriting node_modules in the container when mounting; mount only src or use a named volume for /usr/src/app/node_modules.

## Project layout

- docker-compose.yml
- python-server/
  - Dockerfile
  - src/main.py
  - requirements.txt
- node-server/
  - Dockerfile
  - package.json
  - nodemon.json
  - src/index.js

## Troubleshooting

- If docker-compose fails due to permissions or daemon issues, confirm Docker is running inside the dev container and that the container has access to the Docker socket.
- Use docker-compose logs <service> to inspect logs.
