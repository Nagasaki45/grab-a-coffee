import time

from flask import Flask
from flask import render_template
from flask import request

app = Flask(__name__)


# Dict from name to joining time in seconds since epoch
available_people = {}


@app.route("/")
def index():
    name = request.args.get('name')
    if name and not name in available_people:
        available_people[name] = time.time()
    return render_template("index.html")


@app.route("/poll/<name>")
def poll(name):
    if len(available_people) > 1:
        for match in available_people:
            if match != name:
                app.logger.info("MATCH!!!")
                return {"match": match}
    return {}
