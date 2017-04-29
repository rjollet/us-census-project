# frozen_string_literal: true

# Add code quality data for ruby repository
class ColumnSummary
  extend Dry::Monads::Either::Mixin
  extend Dry::Container::Mixin

  def self.call(params)
    Dry.Transaction(container: self) do
      step :check_if_column
      step :check_table_exist
      step :check_column_exist
      step :check_if_average_exist
      step :get_column_summary
    end.call(params)
  end

  register :check_if_column, lambda { |params|
    params[:column] = URI.decode(params[:column]).to_sym
    if params[:table].nil?
      Left Error.new :not_found, "Please give a column as a parameter"
    else
      Right params
    end
  }

  register :check_table_exist, lambda { |params|
    params[:table] = URI.decode(params[:table]).to_sym
    if DB.table_exists? params[:table]
      Right params
    else
      Left Error.new :not_found, "the table: #{params[:table]} does not exist"
    end
  }

  register :check_column_exist, lambda { |params|
    if DB[params[:table]].columns.include? params[:column].to_sym
      Right params
    else
      Left Error.new :not_found, "the column: #{params[:column]} does not exist"
    end
  }

  register :check_if_average_exist, lambda { |params|
    params[:average] = URI.decode(params[:average]).to_sym unless params[:average].nil?
    if params[:average].nil?
      Right params
    elsif DB[params[:table]].columns.include? params[:average]
      Right params
    else
      Left Error.new :not_found, "the column to average: #{params[:average]} does not exist"
    end
  }

  register :get_column_summary, lambda { |params|
    begin
      if params[:average].nil?
        selection = DB[params[:table].to_sym]
          .select{[params[:column],count(params[:column]).as(:count)]}
      else
        selection = DB[params[:table].to_sym]
          .select{[params[:column],count(params[:column]).as(:count), avg(params[:average])]}
      end
      data = selection.group(params[:column].to_sym)
        .having{count(params[:column]) > 0}
        .reverse_order{count(params[:column])}
        .all
      Right Summary.new data
    rescue
      Left Error.new :cannot_load, 'Cannot load columns information'
    end
  }
end
