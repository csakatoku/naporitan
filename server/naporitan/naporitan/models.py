# -*- coding: utf-8 -*-
import time
import math


class Mission(object):
    def __init__(self, **kwds):
        self.progress = 0
        for k, v in kwds.items():
            setattr(self, k, v)

    def serialize(self):
        return {
            'progress': self.progress,
            }


class Player(object):
    def __init__(self, **kwds):
        self.xp = kwds.get('xp', 0)
        self.level = kwds.get('level', 1)
        self.coins = kwds.get('coins', 100)
        self.energy = kwds.get('energy', 10)
        self.energy_max = kwds.get('energy_max', 10)
        self.last_energy_check = kwds.get('last_energy_check', 0)

    def serialize(self):
        return {
            'xp': self.xp,
            'level': self.level,
            'coins': self.coins,
            'energy': self.energy,
            'energy_max': self.energy_max,
            'last_energy_check': self.last_energy_check,
            }

    def check_energy(self, req_energy):
        real_energy = self.regenerate_energy(False) + self.energy
        return real_energy >= req_energy

    def regenerate_energy(self, update_timestamp=True):
        energy_period = 60
        energy_regeneration_amount = 1

        delta = time.time() - self.last_energy_check
        amount_to_add = math.floor(delta / energy_period)
        if update_timestamp:
            self.last_energy_check += energy_period * amount_to_add

        result = amount_to_add * energy_regeneration_amount

        # Clamp to a fuel tank
        allowed_energy = self.energy % self.energy_max
        if allowed_energy > 0 or self.energy == 0:
            allowed_energy = self.energy_max - allowed_energy

        # Add in regenerated energy
        result = min(result, allowed_energy)

        return result

    def update_energy(self, delta):
        if not self.check_energy(delta * -1):
            return False

        current_energy = min(self.energy, self.energy_max)
        regen_energy = current_energy + self.regenerate_energy()

        # Add in delta
        total = regen_energy + delta

        # Set final energy value
        self.energy = total

        return True
