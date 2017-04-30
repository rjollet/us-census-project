# frozen_string_literal: true

# Show the tables in the database
class ShowTables
  extend Dry::Monads::Either::Mixin
  extend Dry::Container::Mixin

  def self.call(params)
    Dry.Transaction(container: self) do
      step :check_if_db
      step :get_tables
    end.call(params)
  end

  register :check_if_db, (lambda { |params|
    if DB
      Right true
    else
      Left Error.new :not_found, 'No Database'
    end
  })

  register :get_tables, (lambda { |params|
    begin
      message = Tables.new DB.tables.map(&:to_s)
      Right message
    rescue
      Left Error.new :cannot_load, 'Cannot parse tables\' names'
    end
  })
end
