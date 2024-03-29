# frozen_string_literal: true

require 'sinatra'
require 'sequel'

configure :development, :production do
  require 'hirb'
  Hirb.enable
end

configure :development, :test do
  ENV['DATABASE_URL'] = 'sqlite://data/us-census.db'
  ENV['APP_URL'] = 'http://localhost:8000'
end

configure do
  DB = Sequel.connect(ENV['DATABASE_URL'], readonly: true)
end
