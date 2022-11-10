from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class CourseTeller(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key = True)
    course_id = db.Column(db.Integer, db.ForeignKey('course._id'))
    teller_id = db.Column(db.Integer, db.ForeignKey('teller._id'))

    def __init__(self, course_id, teller_id):
        self.course_id = course_id
        self.teller_id = teller_id
    
    def serialize(self):
            d = Serializer.serialize(self)
            return d


class CourseTellerSchema(ma.Schema):
    class Meta:
        fields = ('teller_id',)


course_teller_schema = CourseTellerSchema()
course_teller_schemas = CourseTellerSchema(many=True)