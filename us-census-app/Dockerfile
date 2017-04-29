FROM node:4-slim
EXPOSE 8000

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD package.json* $APP_HOME/
RUN npm install

ADD . $APP_HOME
