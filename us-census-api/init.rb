# frozen_string_literal: true
folders = 'config,controllers'

Dir.glob("./{#{folders}}/init.rb").each do |file|
  require file
end
