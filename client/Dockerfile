# Production Dockerfile for Next.js Client
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY public ./public
COPY src ./src
COPY tailwind.config.ts postcss.config.mjs* postcss.config.js* ./

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runner stage
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node_modules/.bin/next", "start", "-p", "3000"]
