#!/bin/sh
cat app/app.js build/templates.js app/models/*.js app/collections/*.js app/views/*.js app/routers/*.js app/setup.js > build/app.js
uglifyjs -d __DEBUG__=1 -nm -nmf -o build/app.debug.js build/app.js
uglifyjs -d __DEBUG__=0 -o build/app.min.js build/app.js
