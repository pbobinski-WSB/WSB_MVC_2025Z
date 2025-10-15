# Plik: nuxt-app/Dockerfile

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

# Kopiujemy tylko gotowy do uruchomienia serwer Nuxt
COPY --from=builder /app/.output ./.output

# Wystawiamy domyślny port Nuxt.js
EXPOSE 3000

# Komenda startowa dla serwera Nuxt
CMD ["node", ".output/server/index.mjs"]