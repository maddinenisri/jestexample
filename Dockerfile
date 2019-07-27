FROM node:carbon
WORKDIR ./
COPY . /
RUN npm install
CMD [ "npm", "start" ]