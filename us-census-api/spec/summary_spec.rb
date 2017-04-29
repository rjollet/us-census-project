# frozen_string_literal: true
require_relative 'spec_helper'

describe 'Summary columns Routes' do
  it '(HAPPY) should successfully show summary the column with the average' do
    get "/api/v0.1/tables/#{TABLE_VALID}/summary?column=#{COLUMN_VALID}&average=#{AVERAGE_VALID}"
    last_response.body.must_include "{\"occupation code\":\"0\",\"count\":100684,\"avg(`age`)\":30.4666481268126},{\"occupation code\":\"2\",\"count\":8756,\"avg(`age`)\":42.35929648241206}"
    last_response.status.must_equal 200
  end

  it '(HAPPY) should successfully show summary count of a column' do
    get "/api/v0.1/tables/#{TABLE_VALID}/summary?column=#{COLUMN_VALID}"
    last_response.body.must_include "{\"occupation code\":\"0\",\"count\":100684},{\"occupation code\":\"2\",\"count\":8756}"
    last_response.status.must_equal 200
  end

  it '(SAD) should return error if not valid table' do
    get "/api/v0.1/tables/#{TABLE_SAD}/summary?column=#{COLUMN_VALID}"
    last_response.status.must_equal 404
    last_response.body.must_include TABLE_SAD
  end

  it '(SAD) should return error if not valid columns' do
    get "/api/v0.1/tables/#{TABLE_VALID}/summary?column=#{COLUMN_SAD}"
    last_response.status.must_equal 404
    last_response.body.must_include COLUMN_SAD
  end

  it '(SAD) should return error if not valid average columns' do
    get "/api/v0.1/tables/#{TABLE_VALID}/summary?column=#{COLUMN_VALID}&average=#{COLUMN_SAD}"
    last_response.status.must_equal 404
    last_response.body.must_include COLUMN_SAD
  end
end
