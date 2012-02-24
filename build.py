#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import json

PROJECT_DIR = os.path.dirname(__file__)
BUILD_DIR   = os.path.join(PROJECT_DIR, 'build')

def template():
    templates = []
    ext = ".mustache"

    template_dir = os.path.abspath(os.path.join(PROJECT_DIR, 'app', 'templates'))
    for parent, _, filenames in os.walk(template_dir):
        for filename in filenames:
            if not filename.endswith(ext):
                continue

            path = os.path.abspath(os.path.join(parent, filename))
            relative_path = path.replace(template_dir, '').replace(ext, '')

            content = open(path).read()
            templates.append((relative_path[1:], content))

    buf = []
    for template_name, content in templates:
        buf.append('App.templates["%s"] = %s;' % (template_name, json.dumps(content)))

    output_filename = os.path.join(BUILD_DIR, 'templates.js')
    open(output_filename, 'wb').write("\n".join(buf))

if __name__ == '__main__':
    template()
