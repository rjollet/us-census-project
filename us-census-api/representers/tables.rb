# frozen_string_literal: true

# Roar:Decorator for representing the tables in the database
class TablesRepresenter < Roar::Decorator
  include Roar::JSON

  collection :tables
end
