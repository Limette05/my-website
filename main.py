import os
import datetime
from flask import Flask, render_template, request, session, redirect, url_for
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

class User(db.Model, UserMixin):
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(100))
   created_at = db.Column(db.DateTime(), default=datetime.now)



@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host=host)
