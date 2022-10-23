from database.db import db
from database.db import ma
from helpers.serializable import Serializer



class CalendarCourse(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key = True)
    internalCode = db.Column(db.String(100))
    internalName = db.Column(db.String(100))
    course_id = db.Column(db.Integer, db.ForeignKey('course._id')) #sence
    instruction = db.Column(db.String(100))
    courseHours = db.Column(db.Integer)
    ejecutionPlace = db.Column(db.String(100))
    ejecutionCity = db.Column(db.String(100))
    ejecutionRegion = db.Column(db.String(100))
    startDate = db.Column(db.String(100))
    participantValue = db.Column(db.Integer)
    
    def __init__(self, internalCode, internalName, course_id, instruction, courseHours, ejecutionPlace, ejecutionCity, ejecutionRegion, startDate, participantValue):
        self.internalCode = internalCode
        self.internalName = internalName
        self.course_id = course_id
        self.instruction = instruction
        self.courseHours = courseHours
        self.ejecutionPlace = ejecutionPlace
        self.ejecutionCity = ejecutionCity
        self.ejecutionRegion = ejecutionRegion
        self.startDate = startDate
        self.participantValue = participantValue


    def serialize(self):
            d = Serializer.serialize(self)
            return d    

class CalendarSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'internalCode', 'internalName', 'course_id', 'instruction', 'courseHours', 'ejecutionPlace', 'ejecutionCity', 'ejecutionRegion', 'startDate', 'participantValue')

calendar_schema = CalendarSchema()
calendars_schema = CalendarSchema(many=True)