#!/usr/bin/env python

import json
import random

FRUITS = [ 'apple', 'grape', 'mango', 'peach', 'pineapple', 'strawberry', 'blueberry',
'pear', 'plum', 'cantaloupe', 'watermelon', 'orange', 'kiwi', 'banana', 'lemon', 'lime',
'apricot', 'raspberry' ]

tstamp = 1563904100 / 2 * 1000
timeCount = -1
def toObj(f):
  global timeCount
  timeCount = timeCount + 1
  return {
    'name': f,
    'rating': random.randint(1, 10),
    'timestamp': tstamp + (timeCount * 50000000 * 1000)
  }

data = [ toObj(f) for f in FRUITS ]

print(json.dumps(data, indent=2))

