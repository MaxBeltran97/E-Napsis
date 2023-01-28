from database.db import db
from database.db import ma 
from helpers.serializable import Serializer


class CalendarCourseAttendance(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    excelPath = db.Column(db.String(100))
    calendarCourse_id = db.Column(
        db.Integer, db.ForeignKey('calendar_course._id'))

    
    def __init__(self, calendarCourse_id, date, excelPath):
        self.calendarCourse_id = calendarCourse_id
        self.date = date
        self.excelPath = excelPath

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CalendarCourseAttendanceSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'date')

calendar_course_attendance_schemas = (CalendarCourseAttendanceSchema(many=True))
