from database.db import *
from helpers.serializable import Serializer


class Holiday(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    date = db.Column(db.DateTime, nullable=False)


    def __init__(self, name, date):
        self.name = name
        self.date = date


    def serialize(self):
        d = Serializer.serialize(self)
        return d


class HolidaySchema(ma.Schema):
    class Meta:
        fields = ('_id', 'name', 'date')

holiday_schema = HolidaySchema()
holidays_schema = HolidaySchema(many=True)

