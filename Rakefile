# -*- mode: ruby -*-
require "find"
require "json"
require "fileutils"
require "rake/clean"

APP_VERSION = "0.0.3"

ASSET_URL = '../asset'

TOP_DIR = File.dirname(__FILE__)

JS_DIR = "#{TOP_DIR}/app"
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
  Rake::Task['release'].invoke
end

desc 'Compile Templates'
task :template => [BUILD_DIR] do
  data = []

  pattern = Regexp.compile("templates/(.+?)\.html$")
  Find.find(JS_DIR) do |filename|
    matcher = pattern.match(filename)
    if matcher
      template_name = matcher[1]

      content = File.read(filename)

      data.push({
                  :id      => template_name,
                  :content => content
                })
    end
  end

  out = File.open("#{BUILD_DIR}/template.json", "w:UTF-8")
  out.puts({
             :data    => data,
             :version => APP_VERSION,
             :type    => "template"
           }.to_json)
  out.close()
end

desc 'Concat all JavaScript files and templates'
task :concat => [:template] do
  jsfiles = []

  Find.find(JS_DIR) do |filename|
    if File.file?(filename) && /\.js$/.match(filename)

      content = File.read(filename)

      weight = -1
      ignore = false

      matcher = /-\*-(.+?)-\*-/.match(content)
      if matcher
        matcher[1].split(",").each do |meta|
          k, v = meta.split(":")
          k = k.strip()
          v = v.strip()
          if k == 'jsignore'
            ignore = true
          elsif k == 'jsconcat'
            weight = v.to_i
          end
        end
      end

      if ignore
        next
      end

      if weight < 0
        if filename.index('utils/')
          weight = 200
        elsif filename.index('models/')
          weight = 300
        elsif filename.index('collections/')
          weight = 400
        elsif filename.index('views/')
          weight = 500
        elsif filename.index('routers/')
          weight = 600
        else
          weight = 100
        end
      end

      jsfiles.push([weight, filename, content])
    end
  end

  jsfiles.sort! {|a, b| a[0] <=> b[0] }

  buf = []
  jsfiles.each do |weight, filename, content|
    buf.push("// #{filename}")
    buf.push(content)
  end

  out = File.open("build/app.js", "w:UTF-8")
  out.puts(buf.join("\n"))
  out.close()
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

desc 'Make messages'
task :makemessages do
  pot = "locale/messages.pot"
  `find app -name "*.html" -print0 | xargs -0 xgettext --language=python --from-code=UTF-8 --keyword=_tr --add-comments=NOTE -o #{pot}`
  `msguniq --to-code=UTF-8 #{pot}`

  locales = [
             'en',
             'ja',
            ]
  locales.each do |locale|
    $stderr.puts "make messages #{locale}"
    `msgmerge -U locale/#{locale}/LC_MESSAGES/messages.po #{pot}`
  end
end

desc 'Compile po to JSON'
task :po2json do
  `./scripts/po2json.py locale #{BUILD_JS_DIR}`
end

desc 'Copy assets'
task :asset => [BUILD_ASSET_DIR] do
  FileUtils.copy_entry(ASSET_DIR, BUILD_ASSET_DIR)
end

task :release => [BUILD_DIR, BUILD_JS_DIR, :minifyjs, :less, :asset, :po2json] do
  libs = [
          "node_modules/underscore/underscore-min.js",
          "node_modules/backbone/backbone-min.js",
         ]

  libs.each do |filename|
    cp filename, BUILD_JS_DIR
  end
end
