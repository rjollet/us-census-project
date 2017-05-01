# frozen_string_literal: true

# Roar:Decorator for representing the summary
class SummaryRepresenter < Roar::Decorator
  include Roar::JSON

  property :limit
  property :offset
  property :total
  collection :rows
end
