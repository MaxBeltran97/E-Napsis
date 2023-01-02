from database.db import db
from database.db import ma
from helpers.serializable import Serializer



class CompanyData(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    presentation = db.Column(db.String(100))
    legalRepresentativeName = db.Column(db.String(100))
    legalRepresentativeRut = db.Column(db.String(100))
    address = db.Column(db.String(100))
    city = db.Column(db.String(100))
    region = db.Column(db.String(100))
    phone = db.Column(db.String(100))
    facebook = db.Column(db.String(100))
    twitter = db.Column(db.String(100))
    linkedin = db.Column(db.String(100))
    sloganLine1 = db.Column(db.String(100))
    sloganLine2 = db.Column(db.String(100))
    headerBadge = db.Column(db.String(100))

    def __init__(self, presentation, legalRepresentativeName, legalRepresentativeRut, address, city, region, phone, facebook, twitter, linkedin, sloganLine1, sloganLine2, headerBadge):
        self.presentation = presentation
        self.legalRepresentativeName = legalRepresentativeName
        self.legalRepresentativeRut = legalRepresentativeRut
        self.address = address
        self.city = city
        self.region = region
        self.phone = phone
        self.facebook = facebook
        self.twitter = twitter
        self.linkedin = linkedin
        self.sloganLine1 = sloganLine1
        self.sloganLine2 = sloganLine2
        self.headerBadge = headerBadge

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CompanyDataSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'presentation', 'legalRepresentativeName', 'legalRepresentativeRut', 'address', 'city', 'region', 'phone', 'facebook',
                  'twitter', 'linkedin', 'sloganLine1', 'sloganLine2', 'headerBadge')


companys_data_schema = CompanyDataSchema(many=True)
