import os
from os import name
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import csv

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy

from secrets import pw
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:"+ pw +"@localhost:5432/wine_db"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///wine_db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

wine_db = SQLAlchemy(app)

class Wines(wine_db.Model):
    __tablename__ = 'wines'
    # id = wine_db.Column(wine_db.Integer, primary_key=True)
    Vintage = wine_db.Column(wine_db.String)
    Country = wine_db.Column(wine_db.String)
    County = wine_db.Column(wine_db.String)
    Designation = wine_db.Column(wine_db.String)
    Points = wine_db.Column(wine_db.Integer)
    Price = wine_db.Column(' Price ', wine_db.String)
    Province = wine_db.Column(wine_db.String)
    Title = wine_db.Column(wine_db.String, primary_key=True)
    Variety = wine_db.Column(wine_db.String)
    Winery = wine_db.Column(wine_db.String)
    Year = wine_db.Column(wine_db.Integer)


#create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/wine_data")
def wine_data():
    results = wine_db.session.query(
        Wines.Vintage,
        Wines.Country,
        Wines.County,
        Wines.Designation,
        Wines.Points,
        Wines.Price,
        Wines.Province,
        Wines.Title,
        Wines.Variety,
        Wines.Winery,
        Wines.Year
    ).limit(10).all()
    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
