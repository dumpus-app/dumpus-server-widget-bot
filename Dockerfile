FROM node:20-alpine3.17

WORKDIR /app

RUN npm install -g pnpm

# Files required by pnpm install
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
