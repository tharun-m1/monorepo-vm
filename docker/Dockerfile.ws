FROM node:22-alpine

WORKDIR /app

RUN npm i -g pnpm

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./turbo.json ./turbo.json
COPY ./packages ./packages

COPY ./apps/ws ./apps/ws

RUN pnpm install

RUN pnpm run generate:db
RUN pnpm run build

EXPOSE 8080

CMD [ "pnpm", "run", "start:ws" ]
