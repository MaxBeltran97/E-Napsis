from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class Logo(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    code = db.Column(db.String(50))
    logo_img = db.Column(db.String(50))
    

    def __init__(self, title, code, logo_img):
        self.title = title
        self.code = code
        self.logo_img = logo_img


    def serialize(self):
        d = Serializer.serialize(self)
        return d
    
class LogoSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'title', 'code', 'logo_img')

logos_schema = LogoSchema(many=True)

