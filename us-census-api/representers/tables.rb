# frozen_string_literal: true

# Roar:Decorator for representing the developer
class TablesRepresenter < Roar::Decorator
  include Roar::JSON

  collection :tables
end
