# -*- mode: ruby -*-
require "find"
require "json"
require "fileutils"
require "rake/clean"

ASSET_URL = '../asset'

TOP_DIR = File.dirname(__FILE__)

JS_DIR = "#{TOP_DIR}/app"
TEMPLATE_DIR = "#{JS_DIR}/templates"
CSS_DIR = "css"
ASSET_DIR = "asset"

BUILD_DIR = "build"
BUILD_JS_DIR = "#{BUILD_DIR}/js"
BUILD_CSS_DIR = "#{BUILD_DIR}/css"
BUILD_ASSET_DIR = "#{BUILD_DIR}/asset"

directory BUILD_DIR
directory BUILD_JS_DIR
directory BUILD_CSS_DIR
directory BUILD_ASSET_DIR

CLEAN.include("#{BUILD_DIR}/**/*")

desc 'Run all tasks'
task :default do
  Rake::Task['template'].invoke
  Rake::Task['concat'].invoke
  Rake::Task['minifyjs'].invoke
  Rake::Task['less'].invoke
  Rake::Task['server_build'].invoke
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
             "#{JS_DIR}/utils/dom.js",
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

  out = File.open("lib/gen/server-models.js", "w:UTF-8")
  out.puts(buf.join("\n"))
  out.close()

  cp "#{JS_DIR}/app.js", "lib/gen/server-app.js"
  cp "#{JS_DIR}/libs/jsdeferred.js", "lib/gen/jsdeferred.js"
end

desc 'Minify JS'
task :minifyjs => [:concat, BUILD_JS_DIR] do
  `node_modules/uglify-js/bin/uglifyjs -b -nmf --define __DEBUG__=1 --define-from-module #{JS_DIR}/constants.js -o #{BUILD_JS_DIR}/app.debug.js build/app.js`
  `node_modules/uglify-js/bin/uglifyjs -nc --define __DEBUG__=0 --define-from-module #{JS_DIR}/constants.js -o #{BUILD_JS_DIR}/app.prod.js build/app.js`
end

desc 'Compile less to CSS'
task :less => [BUILD_CSS_DIR] do
  `node_modules/less/bin/lessc #{CSS_DIR}/app.less #{BUILD_CSS_DIR}/app.css`
end

desc 'Copy assets'
task :asset => [BUILD_ASSET_DIR] do
  FileUtils.copy_entry(ASSET_DIR, BUILD_ASSET_DIR)
end

task :release => [BUILD_DIR, BUILD_JS_DIR, :minifyjs, :less, :asset] do
  cp "index.html", BUILD_DIR

  libs = [
          "node_modules/underscore/underscore-min.js",
          "node_modules/backbone/backbone-min.js",
          "#{JS_DIR}/libs/zepto.min.js",
          "#{JS_DIR}/libs/jsdeferred.js",
         ]

  libs.each do |filename|
    cp filename, BUILD_JS_DIR
  end
end
