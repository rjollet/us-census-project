# frozen_string_literal: true
ENV['RACK_ENV'] = 'test'

require 'minitest/autorun'
require 'minitest/rg'
require 'rack/test'

require_relative '../init.rb'

include Rack::Test::Methods

def app
  USCensusAPI
end

API_VER = 'api/v0.1'
TABLE_VALID = 'census_learn_sql'
TABLE_SAD = 'not_exist_table'
