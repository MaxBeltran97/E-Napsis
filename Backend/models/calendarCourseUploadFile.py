from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class CalendarCourseUploadFile(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    calendarCourse_id = db.Column(
        db.Integer, db.ForeignKey('calendar_course._id'))
    name = db.Column(db.String(100))
    urlPath = db.Column(db.String(100), unique=True)

    def __init__(self, calendarCourse_id, name, urlPath):
        self.calendarCourse_id = calendarCourse_id
        self.name = name
        self.urlPath = urlPath

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CalendarCourseUploadFileSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'calendarCourse_id', 'name', 'urlPath')


calendarCourseUploadFiles_schema = CalendarCourseUploadFileSchema(many=True)
