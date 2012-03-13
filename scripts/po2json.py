#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import polib
import json


def main():
    src = sys.argv[1]
    dest = sys.argv[2]

    locales = os.listdir(src)
    for locale in locales:
        if not os.path.isdir('%s/%s' % (src, locale)):
            continue

        src_filename = '%s/%s/LC_MESSAGES/messages.po' % (src, locale)
        dest_filename = '%s/%s.json' % (dest, locale)

        data = {}
        entries = polib.pofile(src_filename)
        for entry in entries:
            if not entry.msgid:
                continue

            if entry.translated():
                msg = entry.msgstr
            else:
                msg = None

            data[entry.msgid] = msg

        json.dump(data, fp=open(dest_filename, 'wb'))


if __name__ == '__main__':
    main()
