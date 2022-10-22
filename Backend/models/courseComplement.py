from database.db import db
from helpers.serializable import Serializer



class courseComplement(db.Model, Serializer):

    _id = db.Column(db.Integer, primary_key = True)
    course_id = db.Column(db.Integer, db.ForeignKey('course._id'))
    typeComplement = db.Column(db.Integer) #foreignkey db.ForeignKey('course_complement_type._id')
    description = db.Column(db.String(500))
    amount = db.Column(db.Integer)

    def __init__(self, course_id, typeComplement, description, amount):
        self.course_id = course_id
        self.typeComplement = typeComplement
        self.description = description
        self.amount = amount

    def serialize(self):
            d = Serializer.serialize(self)
            return d 