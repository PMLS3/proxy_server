FROM node:16

WORKDIR /usr/src/app

COPY . ./
RUN npm cache clean --force && npm i -- force

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD [ "npm", "run", "start" ]