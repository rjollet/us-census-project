FROM ruby:2.4.1-slim

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get -y install libsqlite3-dev

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install --without development test

ADD . $APP_HOME
