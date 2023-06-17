FROM node:20-alpine3.17

WORKDIR /app

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Files required by pnpm install
COPY .npmrc package.json pnpm-lock.yaml .pnpmfile.cjs ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

EXPOSE 3000

CMD [ "pnpm", "start" ]
