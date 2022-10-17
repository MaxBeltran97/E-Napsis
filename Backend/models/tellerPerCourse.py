from database.db import db
from helpers.serializable import Serializer



class tellerPerCourse(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key = True)
    teller_id = db.Column(db.Integer, db.ForeignKey('teller._id'))
    course_id = db.Column(db.Integer, db.ForeignKey('course._id'))

    def __init__(self, teller_id, course_id):
        self.teller_id = teller_id
        self.course_id = course_id
    
    
    def serialize(self):
            d = Serializer.serialize(self)
            return d    