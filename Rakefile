# -*- mode: ruby -*-
require "find"
require "json"
require "rake/clean"

JS_DIR = "app"
TEMPLATE_DIR = "#{JS_DIR}/templates"
BUILD_DIR = "build"

directory BUILD_DIR

CLEAN.include("#{BUILD_DIR}/**/*")

desc 'Run all tasks'
task :default do
  Rake::Task['template'].invoke
  Rake::Task['concat'].invoke
  Rake::Task['minifyjs'].invoke
end

desc 'Compile Templates'
task :template => [BUILD_DIR] do
  buf = []

  pattern = Regexp.compile("#{TEMPLATE_DIR}/(.+?)\.mustache$")
  Find.find(TEMPLATE_DIR) do |filename|
    matcher = pattern.match(filename)
    if matcher
      template_name = matcher[1]

      content = File.read(filename)
      jsstr = content.to_json

      buf.push("// #{filename}")
      buf.push("App.templates['#{template_name}'] = #{jsstr};")
    end
  end

  out = File.open("#{BUILD_DIR}/templates.js", "w:UTF-8")
  out.puts(buf.join("\n"))
  out.close()
end

desc 'Concat all JavaScript files and templates'
task :concat => [:template] do
  jsfiles = []

  jsfiles.push("#{JS_DIR}/app.js")
  jsfiles.push("#{BUILD_DIR}/templates.js")

  packages = [
          'models',
          'collections',
          'views',
          'routers',
         ]

  packages.each do |package|
    Dir["#{JS_DIR}/#{package}/*.js"].each do |filename|
      jsfiles.push(filename)
    end
  end

  jsfiles.push("#{JS_DIR}/setup.js")

  buf = []
  jsfiles.each do |filename|
    content = File.read(filename)
    buf.push("// #{filename}")
    buf.push(content)
  end

  out = File.open("build/app.js", "w:UTF-8")
  out.puts(buf.join("\n"))
  out.close()
end

desc 'Minify JS'
task :minifyjs => [:concat] do
  `uglifyjs -nm -nmf -b -d __DEBUG__=1 -o build/app.debug.js build/app.js`
  `uglifyjs -d __DEBUG__=0 -o build/app.prod.js build/app.js`
end
