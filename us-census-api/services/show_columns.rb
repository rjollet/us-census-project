# frozen_string_literal: true

# Add code quality data for ruby repository
class ShowColumns
  extend Dry::Monads::Either::Mixin
  extend Dry::Container::Mixin

  def self.call(params)
    Dry.Transaction(container: self) do
      step :check_table_exist
      step :get_columns
    end.call(params)
  end

  register :check_table_exist, lambda { |params|
    table = URI.decode(params[:table]).to_sym
    if DB.table_exists? table
      Right table
    else
      Left Error.new :not_found, "the table: #{table} does not exist"
    end
  }

  register :get_columns, lambda { |table|
    begin
      message = Table.new table, DB[table].columns.map(&:to_s)
      Right message
    rescue
      Left Error.new :cannot_load, 'Cannot parse columns name'
    end
  }
end
