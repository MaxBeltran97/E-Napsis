from database.db import *
from helpers.serializable import Serializer



class UserRol(db.Model, Serializer):
    _id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(50))
    

    def __init__(self, _id, name):
        self._id = _id
        self.name = name

    def serialize(self):
        d = Serializer.serialize(self)
        return d

class UserRolSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'name')

user_rol_schema = UserRolSchema()
user_rol_schemas = UserRolSchema(many=True)

