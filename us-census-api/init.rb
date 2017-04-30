# frozen_string_literal: true

folders = 'config,values,representers,services,controllers'

Dir.glob("./{#{folders}}/init.rb").each do |file|
  require file
end
