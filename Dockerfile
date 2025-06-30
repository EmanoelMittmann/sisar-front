FROM node:20-bookworm AS build

# Define quais variáveis virão como build-args
WORKDIR /app
COPY package*.json ./
RUN npm config set loglevel verbose
RUN npm install --legacy-peer-deps
COPY . .
ENV NEXT_PUBLIC_API_URL=https://sisar-back-347173917793.southamerica-east1.run.app/api
RUN npm run build


########################
# 2ª fase – runtime    #
########################
FROM node:20-bookworm-slim

# Repete build-args para runtime (se quiser embutir no container)

# Dependências nativas do Chromium
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      ca-certificates fonts-liberation \
      libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 \
      libcups2 libxkbcommon-x11-0 libxcomposite1 libxdamage1 libxrandr2 \
      libgbm1 libpango-1.0-0 libpangocairo-1.0-0 libxshmfence1 libnss3 \
      libxss1 wget xdg-utils && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "start"]