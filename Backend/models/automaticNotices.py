from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class AutomaticNotices(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(100))
    days = db.Column(db.Integer)
    detail = db.Column(db.String(500))
    


    def __init__(self, _id, item, days, detail):
        self._id = _id
        self.item = item
        self.days = days
        self.detail = detail

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class AutomaticNoticesSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'item', 'days', 'detail')

automatic_notices_schema = AutomaticNoticesSchema(many=True)