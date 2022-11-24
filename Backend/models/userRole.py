from database.db import *
from helpers.serializable import Serializer

class UserRole(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    identifierRole = db.Column(db.String(50), unique=True)
    

    def __init__(self, _id, name, identifierRole):
        self._id = _id
        self.name = name
        self.identifierRole = identifierRole

    def serialize(self):
        d = Serializer.serialize(self)
        return d

class UserRoleSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'name', 'identifierRole')

user_role_schema = UserRoleSchema()
user_role_schemas = UserRoleSchema(many=True)

