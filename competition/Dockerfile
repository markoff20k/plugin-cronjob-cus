FROM node:14.17-stretch
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

# Serve the app
CMD ["npm", "start"]