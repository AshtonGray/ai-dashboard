# Multi-stage build: first build the frontend, then set up the backend
# Build context: project root (parent of frontend/ and backend/)

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend source code
COPY frontend/ ./

# Build frontend for production
RUN npm run build

# Stage 2: Python backend with frontend static files
FROM python:3.10-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

ENV APP_HOME /app
ENV PORT 8080
WORKDIR $APP_HOME

# Copy backend code (backend folder contents into APP_HOME)
COPY backend/ ./

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/dist ./static

# Install production dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run the web service on container startup.
# For environments with multiple CPU cores, increase the number of workers.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 wsgi:app
