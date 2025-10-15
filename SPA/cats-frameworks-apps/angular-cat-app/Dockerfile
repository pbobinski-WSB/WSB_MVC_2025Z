# Używamy wersji LTS Node.js
FROM node:18-alpine 

WORKDIR /app

# Kopiujemy oba pliki - package.json i package-lock.json
# Plik `package-lock.json` gwarantuje, że zostaną zainstalowane DOKŁADNIE te same wersje pakietów.
COPY package*.json ./

# === KLUCZOWE ZMIANY ===

# KROK 1: Wyczyść cache npm, aby mieć pewność, że zaczynamy od zera.
# KROK 2: Uruchom `npm install`. Używamy `ci` zamiast `install`, jeśli masz `package-lock.json`.
# `npm ci` jest szybsze, bardziej niezawodne i instaluje dokładnie to, co jest w lockfile.
# Jeśli nie masz `package-lock.json`, użyj `npm install` z czyszczeniem cache'u.
RUN npm cache clean --force && npm ci

# Jeśli `npm ci` zawiedzie (bo nie masz lockfile), użyj tej wersji:
# RUN npm cache clean --force && npm install

# Kopiujemy resztę kodu
COPY . .

# Budujemy aplikację
RUN npm run build

# Wystawiamy port
EXPOSE 4200

# Komenda startowa
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]