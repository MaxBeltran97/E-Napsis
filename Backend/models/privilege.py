from database.db import *
from helpers.serializable import Serializer


class Privilege(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)


    def __init__(self, _id, name):
        self._id = _id
        self.name = name

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class PrivilegeSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'name')

privileges_schema = PrivilegeSchema(many=True)