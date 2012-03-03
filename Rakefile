# -*- mode: ruby -*-
require "find"
require "json"
require "rake/clean"

JS_DIR = "app"
TEMPLATE_DIR = "#{JS_DIR}/templates"
CSS_DIR = "css"

BUILD_DIR = "build"
BUILD_JS_DIR = "#{BUILD_DIR}/js"
BUILD_CSS_DIR = "#{BUILD_DIR}/css"

directory BUILD_DIR
directory BUILD_JS_DIR
directory BUILD_CSS_DIR

CLEAN.include("#{BUILD_DIR}/**/*")

desc 'Run all tasks'
task :default do
  Rake::Task['template'].invoke
  Rake::Task['concat'].invoke
  Rake::Task['minifyjs'].invoke
  Rake::Task['less'].invoke
  Rake::Task['release'].invoke
end

desc 'Compile Templates'
task :template => [BUILD_DIR] do
  buf = []

  pattern = Regexp.compile("#{TEMPLATE_DIR}/(.+?)\.html$")
  Find.find(TEMPLATE_DIR) do |filename|
    matcher = pattern.match(filename)
    if matcher
      template_name = matcher[1]

      content = File.read(filename)
      jsstr = content.to_json

      buf.push("// #{filename}")
      buf.push("T['#{template_name}'] = #{jsstr};")
    end
  end

  template_str = buf.join("\n")

  out = File.open("#{BUILD_DIR}/templates.js", "w:UTF-8")
  out.puts("(function(app) { var T = app.templates; #{template_str} }(App));")
  out.close()
end

desc 'Concat all JavaScript files and templates'
task :concat => [:template] do
  jsfiles = [
             "#{JS_DIR}/app.js",
             "#{BUILD_DIR}/templates.js",
             "#{JS_DIR}/utils/strings.js",
            ]

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

desc 'Concat model classes'
task :server_build do
  jsfiles = [
             "#{JS_DIR}/utils/strings.js",
            ]
  packages = [
          'models',
          'collections',
         ]

  packages.each do |package|
    Dir["#{JS_DIR}/#{package}/*.js"].each do |filename|
      jsfiles.push(filename)
    end
  end

  buf = []
  jsfiles.each do |filename|
    content = File.read(filename)
    buf.push("// #{filename}")
    buf.push(content)
  end

  out = File.open("#{BUILD_DIR}/js/server-models.js", "w:UTF-8")
  out.puts(buf.join("\n"))
  out.close()

  cp "#{JS_DIR}/app.js", "#{BUILD_DIR}/js/server-app.js"
  cp "#{JS_DIR}/server.js", "#{BUILD_DIR}/js/server.js"
end

desc 'Minify JS'
task :minifyjs => [:concat, BUILD_JS_DIR] do
  `node_modules/uglify-js/bin/uglifyjs -nm -nmf -b -d __DEBUG__=1 -o #{BUILD_JS_DIR}/app.debug.js build/app.js`
  `node_modules/uglify-js/bin/uglifyjs -d __DEBUG__=0 -o #{BUILD_JS_DIR}/app.prod.js build/app.js`
end

desc 'Compile less to CSS'
task :less => [BUILD_CSS_DIR] do
  `node_modules/less/bin/lessc #{CSS_DIR}/app.less #{BUILD_CSS_DIR}/app.css`
end

task :release => [BUILD_DIR, BUILD_JS_DIR, :minifyjs, :less] do
  cp "index.html", BUILD_DIR

  libs = [
          "node_modules/underscore/underscore-min.js",
          "node_modules/backbone/backbone-min.js",
          "#{JS_DIR}/libs/zepto.min.js"
         ]

  libs.each do |filename|
    cp filename, BUILD_JS_DIR
  end
end
