# frozen_string_literal: true

# configure based on environment
class USCensusAPI < Sinatra::Base
  get "/#{API_VER}/tables/?" do
    result = ShowTables.call(true)
    if result.success?
      TablesRepresenter.new(result.value).to_json
    else
      ErrorRepresenter.new(result.value).to_status_response
    end
  end

  get "/#{API_VER}/tables/:table/?" do
    result = ShowColumns.call(params[:table])
    if result.success?
      TableRepresenter.new(result.value).to_json
    else
      ErrorRepresenter.new(result.value).to_status_response
    end
  end
end
