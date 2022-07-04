from flask import Flask
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__, static_folder="../build", static_url_path='/')
CORS(app, supports_credentials=True)
#this is good for deployment

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SECRET_KEY'] = 'secret-key-goes-here'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

migrate = Migrate()
migrate.init_app(app, db)

class blogs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100), nullable = False)
    body = db.Column(db.String(100), nullable = False)
    author = db.Column(db.String(100), nullable = False)
    # timetable = db.relationship('Timetable', backref='class_lookup', lazy=True)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route("/api/blogs")
def first_page():
    return {"dates": datetime.utcnow()}

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)

