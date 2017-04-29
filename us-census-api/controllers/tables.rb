# frozen_string_literal: true

# configure based on environment
class USCensusAPI < Sinatra::Base
  get "/#{API_VER}/tables/?" do
    headers 'Access-Control-Allow-Origin' => ENV['APP_URL']
    content_type 'application/json'
    result = ShowTables.call(true)
    if result.success?
      TablesRepresenter.new(result.value).to_json
    else
      ErrorRepresenter.new(result.value).to_status_response
    end
  end

  get "/#{API_VER}/tables/:table/?" do
    headers 'Access-Control-Allow-Origin' => ENV['APP_URL']
    content_type 'application/json'
    result = ShowColumns.call(params)
    if result.success?
      TableRepresenter.new(result.value).to_json
    else
      ErrorRepresenter.new(result.value).to_status_response
    end
  end
end
