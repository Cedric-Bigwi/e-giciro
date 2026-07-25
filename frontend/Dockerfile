FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4173

CMD ["sh", "-c", "npm run build && npm run preview -- --host --port 4173"]
