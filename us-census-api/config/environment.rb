# frozen_string_literal: true
require 'sinatra'
require 'sequel'

configure :development, :production do
  require 'hirb'
  Hirb.enable
end

configure do
  ENV['DATABASE_URL'] = 'sqlite://data/us-census.db'
  ENV['ROOT_URL'] = 'http://localhost:3000'
  DB = Sequel.connect(ENV['DATABASE_URL'], :readonly)
end
