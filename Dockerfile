FROM node:19.2-alpine AS exporter-prod
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --omit=dev --only=production

COPY . .
CMD [ "npm", "start" ]

FROM exporter-prod AS exporter-dev
RUN npm install
