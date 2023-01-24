from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class CalendarCourse(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    internalCode = db.Column(db.String(100))
    internalName = db.Column(db.String(100), unique=True, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course._id'), nullable=False)  # sence
    instruction = db.Column(db.String(100), nullable=False)
    courseTotalHours = db.Column(db.Integer, nullable=False)
    ejecutionPlace = db.Column(db.String(100), nullable=False)
    ejecutionCity = db.Column(db.String(100))
    ejecutionRegion = db.Column(db.String(100))
    startDate = db.Column(db.DateTime, nullable=False)
    endDate = db.Column(db.DateTime, nullable=False)
    participantValue = db.Column(db.Integer, nullable=False)
    logo_id = db.Column(db.Integer, db.ForeignKey('logo._id'))

    def __init__(self, internalCode, internalName, course_id, instruction, courseTotalHours, ejecutionPlace, ejecutionCity, ejecutionRegion, startDate, endDate, participantValue, logo_id):
        self.internalCode = internalCode
        self.internalName = internalName
        self.course_id = course_id
        self.instruction = instruction
        self.courseTotalHours = courseTotalHours
        self.ejecutionPlace = ejecutionPlace
        self.ejecutionCity = ejecutionCity
        self.ejecutionRegion = ejecutionRegion
        self.startDate = startDate
        self.endDate = endDate
        self.participantValue = participantValue
        self.logo_id = logo_id
        self.xd = None

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CalendarCourseSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'internalCode', 'internalName', 'course_id', 'instruction', 'courseTotalHours',
                  'ejecutionPlace', 'ejecutionCity', 'ejecutionRegion', 'startDate', 'endDate', 'participantValue', 'xd', 'logo_id')


calendar_course_schema = CalendarCourseSchema()
calendar_course_schemas = CalendarCourseSchema(many=True)
