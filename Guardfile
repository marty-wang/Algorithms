# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'coffeescript', :input => 'src/coffee', :output => 'src/compiled'
guard 'coffeescript', :input => 'app/coffee', :output => 'app/compiled'
guard 'coffeescript', :input => 'test-js/spec/coffee', :output => 'test-js/spec/compiled'

guard 'less', :output => 'styles/css' do
  watch(%r{^styles/less/(.+\.less)$})
end

guard 'livereload', :apply_js_live => false do
  watch("test-js/SpecRunner.html")
  watch(%r{^test-js/spec/compiled/(.+\.js)$})
  watch(%r{^src/compiled/(.+\.js)$})
  watch(%r{^app/compiled/(.+\.js)$})
  watch(%r{^styles/css/(.+\.css)$})
  watch("index.html")
end
