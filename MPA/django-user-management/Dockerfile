# Użyj oficjalnego obrazu Pythona jako obrazu bazowego
FROM python:3.11-slim

# Ustaw zmienne środowiskowe
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Zainstaluj zależności
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Skopiuj kod aplikacji do kontenera
COPY ./app /app/