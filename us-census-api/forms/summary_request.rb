# frozen_string_literal: true

SummaryRequest = Dry::Validation.Form do
  required(:table).filled
  required(:column).filled
  required(:limit).filled(:int?, gt?: 0)
  required(:offset).filled(:int?, gteq?: 0)

  optional(:average).maybe
end
