# --- Stage 1: Build Frontend ---
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend
COPY frontend/ ./frontend/
RUN npm run build --prefix frontend

# --- Stage 2: Final Backend Image ---
FROM node:20-slim
WORKDIR /app

# Ensure production mode for static file serving
ENV NODE_ENV=production

# Non-root user setup
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home genai

# Backend dependencies
COPY backend/package*.json ./backend/
RUN npm install --prefix backend --only=production

# ... inside Stage 2 ...
COPY backend/ ./backend/

# RECTIFIED: Copy files specifically into the root /app/uploads folder
# This matches your server.js logic: path.join('/app', 'uploads')
COPY backend/uploads/ ./uploads/

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Change ownership of the entire /app directory to the non-root user
RUN chown -R genai:nodejs /app
USER genai

EXPOSE 5000

# Start from backend directory inside the container
WORKDIR /app/backend
CMD ["node", "server.js"]