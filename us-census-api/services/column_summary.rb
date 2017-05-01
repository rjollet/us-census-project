# frozen_string_literal: true

# Do the summary of a column with average if in params
class ColumnSummary
  extend Dry::Monads::Either::Mixin
  extend Dry::Container::Mixin

  def self.call(params)
    Dry.Transaction(container: self) do
      step :check_if_params
      step :parse_url_to_symbol
      step :check_table_exist
      step :check_column_exist
      step :check_if_offset_lower_than_total
      step :check_if_average_exist
      step :get_column_summary
    end.call(params)
  end

  register :check_if_params, (lambda { |params|
    summaryRequest = SummaryRequest.call(params)
    if summaryRequest.success?
      Right summaryRequest.to_h
    else
      Left Error.new :bad_request, summaryRequest.messages.to_s
    end
  })

  register :parse_url_to_symbol, (lambda { |params|
    begin
      params[:column] = URI.decode(params[:column]).to_sym
      params[:table] = URI.decode(params[:table]).to_sym
      params[:average] = URI.decode(params[:average]).to_sym unless params[:average].nil?
      Right params
    rescue
      Left Error.new :bad_request, "Cannot parse the parameter #{params}"
    end
  })

  register :check_table_exist, (lambda { |params|
    if DB.table_exists? params[:table]
      Right params
    else
      Left Error.new :not_found, "the table: #{params[:table]} does not exist"
    end
  })

  register :check_column_exist, (lambda { |params|
    if DB[params[:table]].columns.include? params[:column]
      Right params
    else
      Left Error.new :not_found, "the column: #{params[:column]} does not exist"
    end
  })

  register :check_if_offset_lower_than_total, (lambda { |params|
    begin
      total = DB[params[:table]].select {
        count(distinct(params[:column])).as(:count)
      }.first[:count]
      if params[:offset] >= total
         Left Error.new :bad_request, "offset must be lower than then number of row(#{total})"
      else
        params[:total] = total
        Right params
      end
    rescue
      Left Error.new :cannot_load, "Cannot load total number of values"
    end

  })

  register :check_if_average_exist, (lambda { |params|
    if params[:average].nil?
      Right params
    elsif DB[params[:table]].columns.include? params[:average]
      Right params
    else
      Left Error.new :not_found, "average: #{params[:average]} does not exist"
    end
  })

  register :get_column_summary, (lambda { |params|
    begin
      table_query = DB[params[:table]]
      if params.key? :average
        select_query = table_query.select {
          [
            params[:column],
            count(params[:column]).as(:count),
            avg(params[:average])
          ]
        }
      else
        select_query = table_query.select {
          [params[:column], count(params[:column]).as(:count)]
        }
      end

      query = select_query.group(params[:column])
        .having { count(params[:column]) > 0 }
        .reverse_order { count(params[:column]) }
        .limit(params[:limit], params[:offset])

      Right Summary.new params[:limit], params[:offset], params[:total], query.all
    rescue
      Left Error.new :cannot_load, "Cannot get #{params[:column]} summary"
    end
  })
end
