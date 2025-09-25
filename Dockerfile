FROM node:22-alpine

WORKDIR /usr/src

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema (needed for generate)
# COPY prisma ./prisma
# COPY .env .env

# Make sure DATABASE_URL is available at build time
# ARG DATABASE_URL
# ENV DATABASE_URL=${DATABASE_URL}


COPY . .

#Prisma
RUN npx prisma migrate reset
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# Expose NestJS default port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]