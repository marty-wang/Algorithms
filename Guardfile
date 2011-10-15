# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'coffeescript', :input => 'coffee', :output => 'js/compiled'
guard 'coffeescript', :input => 'test-js/spec/coffee', :output => 'test-js/spec/compiled'

guard 'livereload', :apply_js_live => false do
  watch("test-js/SpecRunner.html")
  watch(%r{^test-js/spec/compiled/(.+\.js)$})
  watch(%r{^js/compiled/(.+\.js)$})
  watch("index.html")
end
