from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class CourseTellerSupport(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course._id'))
    description = db.Column(db.String(500))
    amount = db.Column(db.Integer)

    def __init__(self, course_id, description, amount):
        self.course_id = course_id
        self.description = description
        self.amount = amount

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CourseTellerSupportSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'description', 'amount')


course_teller_support_schema = CourseTellerSupportSchema()
course_teller_support_schemas = CourseTellerSupportSchema(many=True)
