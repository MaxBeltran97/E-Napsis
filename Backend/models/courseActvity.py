from database.db import db
from helpers.serializable import Serializer



class courseActivity(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key = True)
    course_id = db.Column(db.Integer, db.ForeignKey('course._id'))
    activity = db.Column(db.String(500))
    content = db.Column(db.String(500))
    theoreticalHour = db.Column(db.Integer)
    practiceHour = db.Column(db.Integer)
    eLearningHour = db.Column(db.Integer)

    def __init__(self,course_id, activity, content, theoreticalHour, practiceHour, eLearning):
        self.course_id = course_id
        self.activity = activity
        self.content = content
        self.theoreticalHour = theoreticalHour
        self.practiceHour = practiceHour
        self.eLearningHour = eLearning

    def serialize(self):
            d = Serializer.serialize(self)
            return d 