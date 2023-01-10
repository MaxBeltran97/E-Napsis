from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class Contract(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    header = db.Column(db.Text(40000))
    content = db.Column(db.Text(40000))
    representativeSignature = db.Column(db.String(500))

    def __init__(self, _id, title, header, content, representativeSignature):
        self._id = _id
        self.title = title
        self.header = header
        self.content = content
        self.representativeSignature = representativeSignature


    def serialize(self):
        d = Serializer.serialize(self)
        return d


class ContractSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'title', 'header', 'content', 'representativeSignature')

contracts_schema = ContractSchema(many=True)