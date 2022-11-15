FROM node:alpine
RUN apk add --no-cache tzdata ffmpeg
RUN npm install -g npm@9.1.1


WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD [ "node", "." ]