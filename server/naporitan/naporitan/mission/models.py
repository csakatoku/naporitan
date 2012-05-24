# -*- coding: utf-8 -*-
from .protocols import *

class BaseComponent(object):
    def __init__(self):
        self.version = 1

    def wakeup(self):
        try:
            current_version = self.version
        except AttributeError:
            current_version = 1

        to_version = self.component_version()
        for v in xrange(current_version + 1, to_version + 1):
            migrate = getattr(self, 'version_%d' % v, None)
            if callable(migrate):
                print "migrate to %d" % v
                migrate()
            self.version = v


class MissionComponent(BaseComponent):
    def __init__(self):
        super(MissionComponent, self).init()
        self.missions = {}
        self.rewards  = {}

    def __repr__(self):
        return '<MissionComponent missions:%r rewards:%r>' % (self.missions, self.rewards)

    def component_version(self):
        return 1

    def version_1(self):
        missions = {}
        for mission_id, progress in self.missions.items():
            mission_id = int(mission_id)
            missions[mission_id] = {
                'progress': progress,
                'count': 1,
                }
        self.missions = missions

    def execute(self, user, mission_id):
        mission_id = int(mission_id)
        record = self.missions.get(mission_id, {})

        prev_progress = record.get('progress', 0)
        current_progress = prev_progress + 10

        record['progress'] = current_progress
        record['count']    = record.get('count', 0) + 1
        self.missions[mission_id] = record

        if prev_progress < 100 and current_progress >= 100:
            return MissionCompleteProtocol()

        return MissionNoOpProtocol()
