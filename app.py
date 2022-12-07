from flask import Flask
from flask import render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)


# Session ID to name
waiting = {}


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on('join')
def handle_join(name):
    match = None
    for session_id, match in waiting.items():
        emit("match", name, to=session_id)
    if match:
        emit("match", match)
    waiting[request.sid] = name


@socketio.on('disconnect')
def handle_disconnect():
    app.logger.info("disconnecting")
    del waiting[request.sid]


if __name__ == '__main__':
    socketio.run(app, port=8000)
