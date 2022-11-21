from database.db import *
from helpers.serializable import Serializer
from flask_login import UserMixin


#username String(50)
#password
#email String() unique
#String Rol foreign key a id futuro
#id_ String(50)


class User(db.Model, Serializer, UserMixin):
    _id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    rol = db.Column(db.Integer, db.ForeignKey('user_rol._id'))
    avatar = db.Column(db.String(50))

    def __init__(self, username, password, email, avatar, rol):
        self.username = username
        self.password = password
        self.email = email
        self.rol = rol
        self.avatar = avatar

    def serialize(self):
        d = Serializer.serialize(self)
        return d

class UserSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'username', 'password', 'email', 'avatar', 'rol')


users_schema = UserSchema(many=True)