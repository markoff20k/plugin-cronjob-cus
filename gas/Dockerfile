# Create image based on the official Node image from dockerhub
FROM node:14.17-stretch
# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Serve the app
CMD ["npm", "start"]