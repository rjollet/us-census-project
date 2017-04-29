# frozen_string_literal: true

# Roar:Decorator for representing the developer
class TableRepresenter < Roar::Decorator
  include Roar::JSON

  property :table
  collection :columns
end
