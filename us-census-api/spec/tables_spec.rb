# frozen_string_literal: true
require_relative 'spec_helper'

describe 'Tables Show tables Routes' do
  it 'should successfully show the tables' do
    get "/#{API_VER}/tables/?"
    last_response.body.must_equal "{\"tables\":[\"census_learn_sql\"]}"
    last_response.status.must_equal 200
  end
end

describe 'Tables Show columns Routes' do
  it '(HAPPY) should successfully show the columns of a valid table' do
    get "/#{API_VER}/tables/#{TABLE_VALID}/?"
    last_response.body.must_equal "{\"table\":\"census_learn_sql\",\"columns\":[\"age\",\"class of worker\",\"industry code\",\"occupation code\",\"education\",\"wage per hour\",\"last education\",\"marital status\",\"major industry code\",\"major occupation code\",\"mace\",\"hispanice\",\"sex\",\"member of labor\",\"reason for unemployment\",\"fulltime\",\"capital gain\",\"capital loss\",\"dividends\",\"income tax liability\",\"previous residence region\",\"previous residence state\",\"household-with-family\",\"household-simple\",\"weight\",\"msa-change\",\"reg-change\",\"within-reg-change\",\"lived-here\",\"migration prev res in sunbelt\",\"num persons worked for employer\",\"family members under 118\",\"father birth country\",\"mother birth country\",\"birth country\",\"citizenship\",\"own business or self employed\",\"fill questionnaire for veteran's admin\",\"veterans benefits\",\"weeks worked in year\",\"year\",\"salary range\"]}"
    last_response.status.must_equal 200
  end

  it '(SAD) should successfully show the columns of a valid table' do
    get "/#{API_VER}/tables/#{TABLE_SAD}/?"
    last_response.status.must_equal 404
    last_response.body.must_include TABLE_SAD
  end
end
