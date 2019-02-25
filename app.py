from flask import Flask, render_template, request, redirect
import time, json
import requests, os
from flask_socketio import SocketIO, emit, send, join_room, leave_room 
from flask_session import Session

app=Flask(__name__)
app.config["SECRET_KEY"] = "VERYNOTSECRETKEY"
socketio = SocketIO(app)
my_messages=[]
@app.route("/")
def index():
    return render_template("index.html")
@socketio.on("message")
def sendMessage(json):
   #timestamp
  msg_time=time.ctime(time.time())
  msg_data={"msg":json["msg"], "my_time":msg_time}
  my_messages.append(msg_data)
  print("message sent")
  emit("message", msg_data, broadcast=True)

if __name__ == '__main__':
  socketio.run(app)