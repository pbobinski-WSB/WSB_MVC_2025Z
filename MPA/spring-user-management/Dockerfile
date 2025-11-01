# --- ETAP 1: Budowanie aplikacji za pomocą Mavena ---
# Używamy oficjalnego obrazu Mavena z Javą 17 jako "budowniczego"
FROM maven:3.9-eclipse-temurin-17-alpine AS build

# Ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /app

# Kopiujemy plik pom.xml i pobieramy zależności.
# Robimy to jako osobny krok, aby Docker mógł skorzystać z cache,
# jeśli zależności się nie zmienią, co przyspiesza kolejne buildy.
COPY pom.xml .
RUN mvn dependency:go-offline

# Kopiujemy resztę kodu źródłowego
COPY src ./src

# Budujemy aplikację, tworząc plik .jar (pomijamy testy, aby przyspieszyć)
RUN mvn clean package -DskipTests


# --- ETAP 2: Uruchomienie aplikacji w lekkim środowisku ---
# Używamy lekkiego obrazu Javy 17 (tylko środowisko uruchomieniowe)
FROM eclipse-temurin:17-jre-alpine

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy tylko gotowy plik .jar z poprzedniego etapu "build"
# Dzięki temu finalny obraz jest mały i nie zawiera kodu źródłowego ani Mavena.
COPY --from=build /app/target/*.jar app.jar

# Informujemy Dockera, że aplikacja będzie nasłuchiwać na porcie 8080
EXPOSE 8080

# Komenda, która zostanie wykonana po uruchomieniu kontenera
ENTRYPOINT ["java", "-jar", "app.jar"]