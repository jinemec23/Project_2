from secrets import password

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
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:"+ password +"@localhost:5432/wine_db"

@app.route("/")
def index():
    "List all routes that are available"
    return (
        f"Available Routes:</br>"
        f"/wines</br>"
    )
if __name__ == "__main__":
    app.run(debug=True)