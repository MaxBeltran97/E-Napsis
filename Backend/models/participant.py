from database.db import db
from helpers.serializable import Serializer



class Participant(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key = True)
    courseCode = db.Column(db.String(100), unique=True, nullable=False)
    participantType = db.Column(db.String(100))
    company_id = db.Column(db.Integer, db.ForeignKey('company._id'))
    nationalityType = db.Column(db.String(100))
    rut = db.Column(db.String(100), unique=True, nullable=False )
    fullName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    motherLastName = db.Column(db.String(100))
    institution = db.Column(db.String(100))
    email = db.Column(db.String(100))
    gender = db.Column(db.String(100))
    position = db.Column(db.String(100))

    def __init__(self, courseCode, participantType, company_id, nationalityType, rut, fullName, lastName, motherLastName, institution, email, gender, position):
        self.courseCode = courseCode
        self.participantType = participantType
        self.company_id = company_id
        self.nationalityType = nationalityType
        self.rut = rut
        self.fullName = fullName
        self.lastName = lastName
        self.motherLastName = motherLastName
        self.institution = institution
        self.email = email
        self.gender = gender
        self.position = position
    
    def serialize(self):
            d = Serializer.serialize(self)
            return d    