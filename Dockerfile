

FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .


RUN npm run build


ENV NODE_ENV=production

RUN npm ci --omit=dev && npm cache clean --force

USER node


FROM node:22-alpine AS production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 3000


CMD [ "node", "dist/src/main.js" ]