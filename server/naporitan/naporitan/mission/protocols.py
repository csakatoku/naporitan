# -*- coding: utf-8 -*-

class MissionProtocol(object):
    pass


class MissionNoOpProtocol(object):
    pass


class MissionDropCardProtocol(MissionProtocol):
    pass


class MissionDropRewardProtocol(MissionProtocol):
    pass


class MissionEncounterProtocol(MissionProtocol):
    pass


class MissionCompleteProtocol(MissionProtocol):
    pass
