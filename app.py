import time

from flask import Flask
from flask import render_template
from flask import request

app = Flask(__name__)

TIMER_DURATION = 60 * 10

# Dict from name to joining time in seconds since epoch
available_people = {}


def cleanup():
    now = time.time()
    to_remove = [x for x, t in available_people.items() if now - t > TIMER_DURATION]
    for name in to_remove:
        available_people.pop(name)


@app.route("/")
def index():
    cleanup()
    name = request.args.get('name')
    match = request.args.get('match')
    if name and not match and not name in available_people:
        available_people[name] = time.time()
    return render_template("index.html")


@app.route("/poll/<name>")
def poll(name):
    cleanup()
    for match in available_people:
        if match != name:
            available_people[match] = 0
            return {"match": match}
    return {}
