FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY ./ ./

ENV NODE_ENV=production

RUN bun run build

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/dist/csvimg csvimg

ENV NODE_ENV=production
ENV SERVER_EDITION=true

CMD ["./csvimg"]

EXPOSE 3000
