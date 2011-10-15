# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload' do
  watch("test-js/SpecRunner.html")
  watch("test-js/spec/compiled/.+\.js")
  watch("js/compiled/.+\.js")
end

guard 'coffeescript', :input => 'coffee', :output => 'js/compiled'
guard 'coffeescript', :input => 'test-js/spec/coffee', :output => 'test-js/spec/compiled'
