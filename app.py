from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
import time, json
import requests, os
from flask_socketio import SocketIO, emit, send, join_room, leave_room 
from flask_session import Session
from werkzeug.utils import secure_filename
from flask_dropzone import Dropzone

app=Flask(__name__)
app.config["SECRET_KEY"] = "VERYNOTSECRETKEY"
basedir = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = '/static/up'
ALLOWED_EXTENSIONS = set(['txt','pdf','png','jpg','jpeg','gif'])
app.config['UPLOAD_FOLDER'] = os.path.join(basedir,'up')
socketio = SocketIO(app)
dropzone=Dropzone(app)
my_messages={}
channels =[]
users = {}


@app.route("/", methods=['GET','POST'])

def upload():
  if request.method=='POST':
    f=request.files.get('file')
    f.save(os.path.join(app.config['UPLOAD_FOLDER'],f.filename))
  return render_template("index.html", channels=channels)
@socketio.on("message")
def sendMessage(json):
   #timestamp
  msg_time=time.ctime(time.time())
  msg_data={"user":json["user"], "msg":json["msg"], "my_time":msg_time}
  my_messages[json["channel"]].append(msg_data)
  print("message sent")
  emit("message", msg_data, room=json["channel"], broadcast=True)


@socketio.on("username")
def login(username):
  users[username] = request.sid

@socketio.on("channel_creation")
def create_channel(channel):
  if channel in channels:
    emit("error", "Name already taken !")
  else:
    channels.append(channel)
    my_messages[channel] =[]
    join_room(channel)
    data = {"channel":channel, "messages":my_messages[channel]}
    emit("join_channel", data)
@socketio.on("join_channel")
def join_channel(channel):
	# add user to the channel
	join_room(channel)
	data = {"channel": channel, "messages": my_messages[channel]}
	print(data)
	emit("join_channel", data)
@socketio.on("change_channel")
def change_channel(old,new):
  leave_room(old)
  join_room(new)
  data={"channel":new, "messages":my_messages[new]}
  emit("join_channel", data)
if __name__ == '__main__':
  socketio.run(app)