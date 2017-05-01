# frozen_string_literal: true

folders = 'config,values,representers,forms,services,controllers'

Dir.glob("./{#{folders}}/init.rb").each do |file|
  require file
end
