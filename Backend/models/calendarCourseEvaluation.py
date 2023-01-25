from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class CalendarCourseEvaluation(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    evaluationDate = db.Column(db.DateTime, nullable=False)
    percentage = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(100))
    excelPath = db.Column(db.String(100))
    calendarCourse_id = db.Column(
        db.Integer, db.ForeignKey('calendar_course._id'))
    

    def __init__(self,calendarCourse_id, evaluationDate, percentage, title, excelPath):
        self.calendarCourse_id = calendarCourse_id
        self.evaluationDate = evaluationDate
        self.percentage = percentage
        self.title = title
        self.excelPath = excelPath
        

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CalendarCourseEvaluationSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'evaluationDate', 'percentage', 'title')


calendarCourseEvaluations_schemas = CalendarCourseEvaluationSchema(many=True)
