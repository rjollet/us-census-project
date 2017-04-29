# frozen_string_literal: true

# Roar:Decorator for representing the developer
class SummaryRepresenter < Roar::Decorator
  include Roar::JSON

  collection :rows
end
