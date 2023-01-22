from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class CheckList(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    logo_id = db.Column(db.String(50))
    calendarCourse_id = db.Column(
        db.Integer, db.ForeignKey('calendar_course._id'))


    def __init__(self, logo_id, calendarCourse_id):
        self.logo_id = logo_id
        self.calendarCourse_id = calendarCourse_id


    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CheckListSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'logo_id', 'calendarCourse_id')

check_list_schema = CheckListSchema(many=True)