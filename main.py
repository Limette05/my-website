import os
import datetime
from flask import Flask, render_template, request, session, redirect, url_for # type: ignore
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user, login_remembered
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
  pass


host = "localhost"  # deine IP-Adresse
db = SQLAlchemy(model_class=Base)
app = Flask(__name__, static_folder="static")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY
db.init_app(app)

class Header(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   title = db.Column(db.String(200), nullable=True)
   image = db.Column(db.String, nullable=False)
   created_at = db.Column(db.DateTime(), default=datetime.datetime.now)


@app.route("/")
def index():
    mylist = [{"image":"1.jpg","title":"Hallo, das ist meine Website!"}, 
              {"image":"2.jpg", "title":"Ich bin ein total entspannter Typ! :)"}]
    return render_template("index.html", headers=mylist)

@app.route("/showcase-konsolenmenu")
def showcase_konsolenmenu():
   return render_template("showcase-konsolenmenu.html")


if __name__ == "__main__":
    app.run(host=host)
