from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class Company(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    rut = db.Column(db.String(100), unique=True)
    socialReason = db.Column(db.String(100), nullable=False)
    fantasyName = db.Column(db.String(100), nullable=False)
    giro = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    region = db.Column(db.String(100), nullable=False)
    commune = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    contactName = db.Column(db.String(100))
    cellPhone = db.Column(db.Integer)
    position = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self, rut, socialReason, fantasyName, giro, address, region, commune, city, contactName, cellPhone, position, email):
        self.rut = rut
        self.socialReason = socialReason
        self.fantasyName = fantasyName
        self.giro = giro
        self.address = address
        self.region = region
        self.commune = commune
        self.city = city
        self.contactName = contactName
        self.cellPhone = cellPhone
        self.position = position
        self.email = email

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CompanySchema(ma.Schema):
    class Meta:
        fields = ('_id', 'rut', 'socialReason', 'fantasyName', 'giro', 'address',
                  'region', 'commune', 'city', 'contactName', 'cellPhone', 'position', 'email')


company_schema = CompanySchema()
companys_schema = CompanySchema(many=True)
