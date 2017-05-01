# frozen_string_literal: true

# configure based on environment
class USCensusAPI < Sinatra::Base
  API_VER = 'api/v0.1'

  get '/?' do
    "USCensusAPI latest version endpoints are at: /#{API_VER}/"
  end

  get "/api/v0.1/?" do
    content_type 'application/json'
    [
      {
        url: "#{API_VER}/tables",
        result: {
          tables: ['LIST_OF_TABLES']
        }
      },
      {
        url: "#{API_VER}/tables/<TABLE_NAME>",
        result: {
          table: 'TABLE_NAME',
          columns: ['LIST_OF_COLUMNS']
        }
      },
      {
        url: "#{API_VER}/tables/<TABLE_NAME>/summary",
        params: {
          column: 'column to group by',
          limit: 'limit of rows to query',
          offset: 'offset of rows',
          average: '(optional) column to average'
        },
        result: {
          limit: 'LIMIT',
          offset: 'OFFSET',
          rows: {
            COLUMN: 'VALUE',
            count: 'Count of the value',
            "avg('AVERAGE')": 'Average value if in params'
          }
        }
      }
    ].to_json
  end
end
