from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class CheckList(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    calendarCourse_id = db.Column(
        db.Integer, db.ForeignKey('calendar_course._id'))


    def __init__(self, calendarCourse_id):
        self.calendarCourse_id = calendarCourse_id


    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CheckListSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'calendarCourse_id')

check_list_schema = CheckListSchema(many=True)