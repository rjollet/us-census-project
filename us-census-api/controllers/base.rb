# frozen_string_literal: true

# configure based on environment
class USCensusAPI < Sinatra::Base
  API_VER = 'api/v0.1'

  get '/?' do
    "USCensusAPI latest version endpoints are at: /#{API_VER}/"
  end
end
