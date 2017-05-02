# frozen_string_literal: true

# Roar:Decorator for representing the table with its columns
class TableRepresenter < Roar::Decorator
  include Roar::JSON

  property :table
  collection :columns
  collection :numerical_columns
end
