from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class AutomaticNoticesEmail(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    notice_id = db.Column(
        db.Integer, db.ForeignKey('automatic_notices._id'))

    
    def __init__(self, email, notice_id):
        self.email = email
        self.notice_id = notice_id

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class AutomaticNoticesEmailSchema(ma.Schema):
    class Meta:
            fields = ('email', )

automatic_notices_emails_schema = AutomaticNoticesEmailSchema(many=True)