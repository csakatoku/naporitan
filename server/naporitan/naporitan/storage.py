# -*- coding: utf-8 -*-
import memcache
import json

class Storage(object):
    @property
    def client(self):
        try:
            return self._client
        except AttributeError:
            self._client = memcache.Client(["127.0.0.1:11211"])
            return self._client

    def get(self, cls, *ids):
        _id = '_'.join([str(x) for x in ids])
        key = str('%s_%s' % (cls.__name__, _id))

        client = self.client

        data = client.get(key)
        args = None
        if data:
            try:
                args = json.loads(data)
            except Exception:
                pass

        args = args or {}
        obj = cls(**args)

        def save():
            data = obj.serialize()
            return client.set(key, json.dumps(data))

        obj.save = lambda: save()

        return obj

    def set(self, obj, _id):
        data = obj.serialize()
        key = '%s_%s' % (obj.__class__.__name__, _id)
        return self.client.set(key, data)


## global instance
storage = Storage()
