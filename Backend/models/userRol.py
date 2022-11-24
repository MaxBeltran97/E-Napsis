from database.db import *
from helpers.serializable import Serializer



class UserRol(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    identifierRol = db.Column(db.String(50), unique=True)
    

    def __init__(self, _id, name, identifierRol):
        self._id = _id
        self.name = name
        self.identifierRol = identifierRol

    def serialize(self):
        d = Serializer.serialize(self)
        return d

class UserRolSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'name', 'identifierRol')

user_rol_schema = UserRolSchema()
user_rol_schemas = UserRolSchema(many=True)

