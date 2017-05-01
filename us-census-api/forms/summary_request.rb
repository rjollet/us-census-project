# frozen_string_literal: true

SummaryRequest = Dry::Validation.Form do
  required(:table).filled
  required(:column).filled

  optional(:average).filled
  optional(:limit).filled(:int?, gt?: 0)
end
