import os
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


@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host=host)