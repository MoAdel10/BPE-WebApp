FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
# Set the default value to localhost:8000
ARG VITE_API_URL=http://localhost:8000
ARG VITE_STRIPE_PUBLIC_KEY=pk_test_51SmfzNHo53mO5LettSbBkKRLFhrgtw8ZMUwerTBnsMmhxcOvaxgLu0oppmOQcwz2pGQJhnM68NLEJIRrKq812agN00jSPWoMAU

# Assigning them to ENV so the build process picks them up
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY

COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]