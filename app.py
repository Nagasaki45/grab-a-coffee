from flask import Flask
from flask import render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)


# {Location: {Session ID: name}}
data = {
    "Mintel House - Ground Floor": {},
    "Carter Lane": {}
}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/locations")
def locations():
    return {'locations': list(data.keys())}


@socketio.on('join')
def handle_join(name, location):
    waiting = data[location]
    match = None
    for session_id, match in waiting.items():
        emit("match", name, to=session_id)
    if match:
        emit("match", match)
    waiting[request.sid] = name


@socketio.on('disconnect')
def handle_disconnect():
    for location_data in data.values():
        if request.sid in location_data:
            del location_data[request.sid]


if __name__ == '__main__':
    socketio.run(app, port=8000)
