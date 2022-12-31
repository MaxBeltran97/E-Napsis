from database.db import *
from helpers.serializable import Serializer


class TemplatesEmail(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(50))
    

    def __init__(self,_id, title, subject, content):
        self._id = _id
        self.title = title
        self.subject = subject
        self.content = content
    
    def serialize(self):
        d = Serializer.serialize(self)
        return d


class TemplatesEmailSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'title', 'subject', 'content')


templates_email_schema = TemplatesEmailSchema(many=True)