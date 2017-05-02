FROM node:4-slim
EXPOSE 8000

ENV APP_HOME /home/census
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY package.json ./

RUN npm install --no-optional && npm cache clean

COPY app ./app

CMD ["npm", "start"]
