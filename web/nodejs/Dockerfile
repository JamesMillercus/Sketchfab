# Define the node image
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install -g gulp
# RUN npm install
# RUN npm rebuild node-sass --force

# Bundle app source
COPY . /usr/src/app

# Expose the server on 3000
EXPOSE 3000 4000