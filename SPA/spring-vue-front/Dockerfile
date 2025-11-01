# ETAP 1: Budowanie statycznych plików Vue.js
# Używamy Node.js w wersji 20, aby spełnić wymagania Vite
FROM node:20-alpine AS build

WORKDIR /app

# Kopiujemy pliki package.json i instalujemy zależności
COPY package*.json ./
RUN npm install

# Kopiujemy resztę kodu źródłowego
COPY . .

# Budujemy aplikację do produkcji
RUN npm run build


# ETAP 2: Serwowanie plików za pomocą Nginx
FROM nginx:1.25-alpine

# Kopiujemy zbudowane pliki z etapu "build" do folderu serwera Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Usuwamy domyślną konfigurację Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Kopiujemy naszą własną konfigurację Nginx
COPY nginx.conf /etc/nginx/conf.d

# Informujemy Dockera, że Nginx nasłuchuje na porcie 80
EXPOSE 80

# Komenda startowa Nginx
CMD ["nginx", "-g", "daemon off;"]