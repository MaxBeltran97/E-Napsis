from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class TellerUploadFile(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    teller_id = db.Column(db.Integer, db.ForeignKey('teller._id'))
    name = db.Column(db.String(100))
    urlPath = db.Column(db.String(100), unique=True)

    def __init__(self, teller_id, name, urlPath):
        self.teller_id = teller_id
        self.name = name
        self.urlPath = urlPath
    
    def serialize(self):
        d = Serializer.serialize(self)
        return d

class TellerUploadFileSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'teller_id', 'name', 'urlPath')

tellerUploadFiles_schema = TellerUploadFileSchema(many=True)