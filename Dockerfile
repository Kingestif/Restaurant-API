# ---------- Stage 1: Build ----------

FROM node:22.17.1-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# RUN npm prune --omit=dev

# ---------- Stage 2: Test ----------
FROM builder AS test
CMD ["npm", "test"]

# ---------- Stage 2: Runtime ----------

FROM node:22.17.1-slim AS runtime

WORKDIR /app

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma

COPY entrypoint.sh ./

RUN chmod +x entrypoint.sh

CMD ["sh", "/app/entrypoint.sh"]