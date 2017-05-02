# frozen_string_literal: true

# Show the columns fo a table
class ShowColumns
  extend Dry::Monads::Either::Mixin
  extend Dry::Container::Mixin

  def self.call(params)
    Dry.Transaction(container: self) do
      step :check_table_exist
      step :get_columns
      step :get_numerical_columns
    end.call(params)
  end

  register :check_table_exist, (lambda { |params|
    table = URI.decode(params[:table]).to_sym
    if DB.table_exists? table
      Right table
    else
      Left Error.new :not_found, "the table: #{table} does not exist"
    end
  })

  register :get_columns, (lambda { |table|
    begin
      Right table: table, columns: DB[table].columns.map(&:to_s)
    rescue
      Left Error.new :cannot_load, 'Cannot parse columns name'
    end
  })

  register :get_numerical_columns, (lambda { |params|
    begin
      num_col = schema_to_numerical_columns(DB.schema(params[:table]))
      Right Table.new params[:table], params[:columns], num_col
    rescue
      Left Error.new :cannot_load, 'Cannot parse columns name'
    end
  })

  def self.schema_to_numerical_columns(schema)
    schema.select { |col|
      [:integer, :float, :long, :double].include? col[1][:type]
    }.map{ |col| col[0].to_s}
  end
end
