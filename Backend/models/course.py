from database.db import db
from helpers.serializable import Serializer



class Course(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key = True)
    sense = db.Column(db.String(100), unique=True, nullable=False)
    instruction = db.Column(db.String(100), nullable=False)
    activityType = db.Column(db.String(100))
    activityName = db.Column(db.String(100), nullable=False)
    attendence = db.Column(db.Integer, nullable=False)
    minCalification = db.Column(db.Float)
    minHours = db.Column(db.Integer)
    participantsNumber = db.Column(db.Integer)
    targetPopulation = db.Column(db.String(500))
    generalObjectives = db.Column(db.String(500))
    totalHours = db.Column(db.Integer, nullable=False)
    teachingTechnique = db.Column(db.String(500))
    evaluation = db.Column(db.String(500), nullable=False)
    infrastructure = db.Column(db.String(500))
    participantValue = db.Column(db.Integer, nullable=False)
    requestDate = db.Column(db.String(100), nullable=False)

    def __init__(self, sense, instruction, activityType, activityName, attendence, minCalifaction, minHours, participantsNumber, targetPopulation, generalObjectives, totalHours, teachingTechnique, evaluation, infrastructure, participantValue, requestDate):
        self.sense = sense
        self.instruction = instruction
        self.activityType = activityType
        self.activityName = activityName
        self.attendence = attendence
        self.minCalification = minCalifaction
        self.minHours = minHours
        self.participantsNumber = participantsNumber
        self.targetPopulation = targetPopulation
        self.generalObjectives = generalObjectives
        self.totalHours = totalHours
        self.teachingTechnique = teachingTechnique
        self.evaluation = evaluation
        self.infrastructure = infrastructure
        self.participantValue = participantValue
        self.requestDate = requestDate
    
    
    def serialize(self):
            d = Serializer.serialize(self)
            return d    