import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy

from secrets import pw
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:"+ pw +"@localhost:5432/wine_db"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# class Pet(db.Model):
#         __tablename__ = 'pets'

#         id = db.Column(db.Integer, primary_key=True)
#         name = db.Column(db.String(64))
#         lat = db.Column(db.Float)
#         lon = db.Column(db.Float)

#         def __repr__(self):
#             return '<Pet %r>' % (self.name)

# create route that renders index.html template
# @app.route("/")
# def home():
#     return render_template("index.html")

@app.route("/")
def index():
    "List all routes that are available"
    return (
        f"Available Routes:</br>"
        f"/wines</br>"
    )

# # Query the database and send the jsonified results
# @app.route("/send", methods=["GET", "POST"])
# def send():
#     if request.method == "POST":
#         name = request.form["petName"]
#         lat = request.form["petLat"]
#         lon = request.form["petLon"]

#         pet = Pet(name=name, lat=lat, lon=lon)
#         db.session.add(pet)
#         db.session.commit()
#         return redirect("/", code=302)

#     return render_template("form.html")


# @app.route("/api/pals")
# def pals():
#     results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()

#     hover_text = [result[0] for result in results]
#     lat = [result[1] for result in results]
#     lon = [result[2] for result in results]

#     pet_data = [{
#         "type": "scattergeo",
#         "locationmode": "USA-states",
#         "lat": lat,
#         "lon": lon,
#         "text": hover_text,
#         "hoverinfo": "text",
#         "marker": {
#             "size": 50,
#             "line": {
#                 "color": "rgb(8,8,8)",
#                 "width": 1
#             },
#         }
#     }]

#     return jsonify(pet_data)

    
if __name__ == "__main__":
    app.run(debug=True)

