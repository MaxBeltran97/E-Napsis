from database.db import db
from helpers.serializable import Serializer

class Teller(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key = True)
    nationalityType = db.Column(db.String(100))
    rut = db.Column(db.String(100), unique=True, nullable=False)
    fullName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    motherLastName = db.Column(db.String(100), nullable=False)
    nationality = db.Column(db.String(100))
    birthday = db.Column(db.DateTime)
    profession = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    cellPhone = db.Column(db.Integer)
    maritalStatus = db.Column(db.String(100))
    address = db.Column(db.String(100))
    region = db.Column(db.String(100))
    commune = db.Column(db.String(100))
    situation = db.Column(db.Boolean)

    def __init__(self, nationalityType, rut, fullName, lastName, motherLastName, nationality, birthday, profession, email, cellPhone, maritalStatus, address, region, commune, situation ):
        self.nationalityType = nationalityType
        self.rut = rut
        self.fullName = fullName
        self.lastName = lastName
        self.motherLastName = motherLastName
        self.nationality = nationality
        self.birthday = birthday
        self.profession = profession
        self.email = email
        self.cellPhone = cellPhone
        self.maritalStatus = maritalStatus
        self.address = address
        self.region = region
        self.commune = commune
        self.situation = situation
   
    def serialize(self):
        d = Serializer.serialize(self)
        return d

    @classmethod
    def getDataById(cls, id):
        data = None
        try:
            if id:
                data = cls.query.filter(id == id).first()
            return data
        except Exception as e:
            return data    
