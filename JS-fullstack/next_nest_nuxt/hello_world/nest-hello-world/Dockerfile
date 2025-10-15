# Plik: nest-app/Dockerfile

# --- Etap 1: Budowanie aplikacji ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Etap 2: Stworzenie obrazu produkcyjnego ---
FROM node:18-alpine
WORKDIR /app

# Kopiujemy tylko niezbędne pliki
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --omit=dev

# Wystawiamy domyślny port Nest.js
EXPOSE 3000

# Komenda startowa dla Nest.js
CMD ["node", "dist/main"]