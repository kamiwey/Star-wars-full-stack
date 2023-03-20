from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False)
    name = db.Column(db.String(250), nullable=True)
    lastname = db.Column(db.String(250), nullable=True)
    country = db.Column(db.String(120), nullable=True)
    premium = db.Column(db.Boolean, unique=False, default=False)
    admin = db.Column(db.Boolean, unique=False, default=False)
    

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "country": self.country,
            "premium": self.premium,
            "admin": self.admin,
            # do not serialize the password, its a security breach
        }