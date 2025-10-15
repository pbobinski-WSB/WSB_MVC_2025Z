# Plik: next-app/Dockerfile

# --- Etap 1: Budowanie aplikacji ---
FROM node:18-alpine AS builder

WORKDIR /app

# Kopiujemy tylko pliki z zależnościami
COPY package*.json ./

# Instalujemy WSZYSTKIE zależności (włącznie z deweloperskimi)
RUN npm install

# Kopiujemy resztę kodu aplikacji
COPY . .

# Budujemy aplikację produkcyjną
RUN npm run build

# --- Etap 2: Stworzenie obrazu produkcyjnego ---
FROM node:18-alpine

WORKDIR /app

# Kopiujemy tylko niezbędne pliki z etapu 'builder'
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instalujemy TYLKO zależności produkcyjne
RUN npm install --omit=dev

# Wystawiamy port, na którym działa aplikacja Next.js
EXPOSE 3000

# Komenda do uruchomienia aplikacji
CMD ["npm", "start"]