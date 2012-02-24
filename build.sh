#!/bin/sh
cat app/app.js build/templates.js app/models/*.js app/collections/*.js app/views/*.js app/routers/*.js app/setup.js > build/app.js
uglifyjs -d __DEBUG__=1 build/app.js > build/app.debug.js
uglifyjs -d __DEBUG__=0 build/app.js > build/app.min.js
