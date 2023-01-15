from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class ContractUploadFile(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    contract_id = db.Column(
        db.Integer, db.ForeignKey('contract._id'))
    name = db.Column(db.String(100))
    urlPath = db.Column(db.String(100), unique=True)


    def __init__(self, contract_id, name, urlPath):
        self.contract_id = contract_id
        self.name = name
        self.urlPath = urlPath

    def serialize(self):
        d = Serializer.serialize(self)
        return d

class ContractUploadFileSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'contract_id', 'name', 'urlPath')

contracts_upload_file_schema = ContractUploadFileSchema(many=True) 