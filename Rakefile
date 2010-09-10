require "rubygems"
require "bundler/setup"

Bundler.require :default

desc 'Create bundled files for distribution.'
task :bundle do
  version = File.read('VERSION').strip
  
  files = ['observable.js']
  
  string = files.inject '' do |s, f|
    s << File.read("src/#{f}")
  end
  
  File.open("dist/observable-#{version}.js", 'w') do |f|
    f.write string
  end
  
  File.open("dist/observable-#{version}-min.js", 'w') do |f|
    f.write Closure::Compiler.new.compile(string)
  end
  
end
