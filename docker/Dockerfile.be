FROM node:22-alpine
WORKDIR /app



COPY ./packages ./packages
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json

COPY ./apps/http-server ./apps/http-server

RUN npm i -g pnpm
RUN pnpm install

RUN pnpm run generate:db
RUN pnpm run build

EXPOSE 4000

CMD [ "pnpm", "run", "start:backend" ]

 