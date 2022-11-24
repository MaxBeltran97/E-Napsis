from database.db import *
from helpers.serializable import Serializer
from flask_login import UserMixin



class User(db.Model, Serializer, UserMixin):
    _id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    avatar = db.Column(db.String(50))
    role = db.Column(db.String(50), db.ForeignKey('user_role.identifierRole'))
    

    def __init__(self, username, password, email, avatar, role):
        self.username = username
        self.password = password
        self.email = email
        self.avatar = avatar
        self.role = role
    def serialize(self):
        d = Serializer.serialize(self)
        return d


class UserSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'username', 'password', 'email', 'avatar', 'role')


users_schema = UserSchema(many=True)