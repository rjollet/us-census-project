# frozen_string_literal: true

# configure based on environment
class USCensusAPI < Sinatra::Base
  get "/#{API_VER}/tables/:table/summary/?" do
    headers 'Access-Control-Allow-Origin' => ENV['APP_URL']
    content_type 'application/json'
    result = ColumnSummary.call(params)
    if result.success?
      SummaryRepresenter.new(result.value).to_json
    else
      ErrorRepresenter.new(result.value).to_status_response
    end
  end
end
