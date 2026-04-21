FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache curl dumb-init \
  && addgroup -S lunexa && adduser -S lunexa -G lunexa

COPY --from=builder --chown=lunexa:lunexa /app/public ./public
COPY --from=builder --chown=lunexa:lunexa /app/.next/standalone ./
COPY --from=builder --chown=lunexa:lunexa /app/.next/static ./.next/static

USER lunexa
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3001/ > /dev/null || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
