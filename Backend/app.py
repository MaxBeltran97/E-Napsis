import sys,os,click,json
from unittest import result
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_mysqldb import MySQL
import marshmallow


from redis_app import redis
from database.db import db
from database.config import app_config, DevelopmentConfig


from models.company import Company
from models.teller import Teller as modelTeller
from models.teller import teller_schema
from models.teller import tellers_schema
from models.participant import Participant as modelParticipant
from models.participant import participant_schema
from models.participant import participants_schema
from models.courseActvity import courseActivity
from models.tellerPerCourse import tellerPerCourse
from models.courseComplement import courseComplement

from resources.login import Login
from resources.company import Company
from resources.course import Course
from resources.UploadParticipants import UploadParticipants


# IMPORTACIÓN DE RECURSOS
app = Flask(__name__)
CORS(app)
ma = Marshmallow(app)

#Se establece enviroment como argumento
#enviroment = sys.argv[1]
enviroment = "development"
#enviroment = "production"


#Se setean variables de configuración según ambient(env)
app.config.from_object(app_config[enviroment])
api = Api(app)


#Endpoints y la clase que se encargará de procesar cada solicitud

api.add_resource(Login, '/login')

#api.add_resource(Teller, '/api/teller')

api.add_resource(Company, '/api/company')

#api.add_resource(Participant, '/api/participant')

api.add_resource(Course, '/api/course')

#api.add_resource(UploadParticipants, '/api/UploadParticipants')

   

#Se carga raiz
@app.route('/')
def index():
    return render_template('index.html')


#--------------------------------------------TELLER

@app.route('/api/teller', methods=['POST'])
def addTeller():
    try:     
        nationalityType = request.json['nationalityType']
        rut = request.json['rut']
        fullName = request.json['fullName']
        lastName = request.json['lastName']
        motherLastName = request.json['motherLastName']
        nationality = request.json['nationality']
        birthday = request.json['birthday']
        profession = request.json['profession']
        email = request.json['email']
        cellPhone = request.json['cellPhone']
        maritalStatus = request.json['maritalStatus']
        address = request.json['address']
        region = request.json['region']
        commune = request.json['commune']
        situation = request.json['situation']
        reuf = request.json['reuf']

            # TODO: variable para un tipo de rol de Relator
            # uploadFiles = data['uploadFiles']

        new_teller = modelTeller(nationalityType, rut, fullName, lastName, motherLastName, nationality, birthday, profession, email, cellPhone, maritalStatus, address, region, commune, situation, reuf)

        db.session.add(new_teller)
    
        db.session.commit()

        return teller_schema.jsonify(new_teller)
        #return {"message": "Relator guardado con exito :)."}
    except Exception as e:
            print(e)
            return {"message": "Error al ingresar un relator."}, 500

@app.route('/api/teller', methods=['GET'])
def get_tellers():

    try:
        all_tellers = modelTeller.query.all()
        result = tellers_schema.dump(all_tellers)
        return jsonify(result)

    except Exception as e:
            print(e)
            return {"message": "Error al obtener un relator."}, 500

@app.route('/api/teller/<_id>', methods=['GET'])
def get_teller(_id):
    
    try:

        teller = modelTeller.query.get(_id)
        return teller_schema.jsonify(teller)

    except Exception as e:
            print(e)
            return {"message": "Error al obtener un relator."}, 500    

@app.route('/api/teller/<_id>', methods=['PUT'])
def update_teller(_id):
    try:
    
        teller = modelTeller.query.get(_id)

        nationalityType = request.json['nationalityType']
        rut = request.json['rut']
        fullName = request.json['fullName']
        lastName = request.json['lastName']
        motherLastName = request.json['motherLastName']
        nationality = request.json['nationality']
        birthday = request.json['birthday']
        profession = request.json['profession']
        email = request.json['email']
        cellPhone = request.json['cellPhone']
        maritalStatus = request.json['maritalStatus']
        address = request.json['address']
        region = request.json['region']
        commune = request.json['commune']
        situation = request.json['situation']
        reuf = request.json['reuf']

        teller.nationalityType = nationalityType
        teller.rut = rut
        teller.fullName = fullName
        teller.lastName = lastName
        teller.motherLastName = motherLastName
        teller.nationality = nationality
        teller.birthday = birthday
        teller.profession = profession
        teller.email = email
        teller.cellPhone = cellPhone
        teller.maritalStatus = maritalStatus
        teller.address = address
        teller.region = region
        teller.commune = commune
        teller.situation = situation
        teller.reuf = reuf
        
        db.session.commit()
        return teller_schema.jsonify(teller)

    except Exception as e:
            print(e)
            return {"message": "Error al actualizar un relator."}, 500

@app.route('/api/teller/<_id>', methods=['DELETE'])
def delete_teller(_id):
    
    try: 
        teller = modelTeller.query.get(_id)
        db.session.delete(teller)
        db.session.commit()

        return teller_schema.jsonify(teller)

    except Exception as e:
            print(e)
            return {"message": "Error al eliminar un relator."}, 500



#--------------------------------------------PARTICIPANT



@app.route('/api/participant', methods=['POST'])
def addParticipant():
    try:
        courseCode = request.json['courseCode']
        participantType = request.json['participantType']
        company_id = request.json['company_id']
        nationalityType = request.json['nationalityType']
        rut = request.json['rut']
        fullName = request.json['fullName']
        lastName = request.json['lastName']
        motherLastName = request.json['motherLastName']
        institution = request.json['institution']
        email = request.json['email']
        gender = request.json['gender']
        position = request.json['position']

        new_participant = modelParticipant(courseCode, participantType, company_id, nationalityType, rut, fullName, lastName, motherLastName, institution, email, gender, position)

        db.session.add(new_participant)

        db.session.commit()

        return participant_schema.jsonify(new_participant)

    except Exception as e:
            print(e)
            return {"message": "Error al ingresar un participante."}, 500


@app.route('/api/participant', methods=['GET'])
def get_participants():
    
    try:
        all_participants = modelParticipant.query.all()
        result = participants_schema.dump(all_participants)
        return jsonify(result)
    except Exception as e:
            print(e)
            return {"message": "Error al obtener los participantes."}, 500

@app.route('/api/participant/<_id>', methods=['GET'])
def get_participant(_id):
    
    try:

        participant = modelParticipant.query.get(_id)
        return participant_schema.jsonify(participant)

    except Exception as e:
            print(e)
            return {"message": "Error al obtener un participante."}, 500       

@app.route('/api/participant/<_id>', methods=['PUT'])
def update_participant(_id):
    try:
        participant = modelParticipant.query.get(_id)

        courseCode = request.json['courseCode']
        participantType = request.json['participantType']
        company_id = request.json['company_id']
        nationalityType = request.json['nationalityType']
        rut = request.json['rut']
        fullName = request.json['fullName']
        lastName = request.json['lastName']
        motherLastName = request.json['motherLastName']
        institution = request.json['institution']
        email = request.json['email']
        gender = request.json['gender']
        position = request.json['position']

        participant.courseCode = courseCode
        participant.participantType = participantType
        participant.company_id = company_id
        participant.nationalityType = nationalityType
        participant.rut = rut
        participant.fullName = fullName
        participant.lastName = lastName
        participant.motherLastName = motherLastName
        participant.institution = institution
        participant.email = email
        participant.gender = gender
        participant.position = position

        db.session.commit()
        return participant_schema.jsonify(participant)
        

    except Exception as e:
            print(e)
            return {"message": "Error al actualizar un participante."}, 500


@app.route('/api/participant/<_id>', methods=['DELETE'])
def delete_participant(_id):
   
    try:
        participant = modelParticipant.query.get(_id)
        db.session.delete(participant)
        db.session.commit()

        return participant_schema.jsonify(participant)

    except Exception as e:
            print(e)
            return {"message": "Error al eliminar un participante."}, 500    

        



#--------------------------------------------


@app.route('/api/courseActivity', methods=['POST'])
def addcourseActivity():
    try: 
        course_id = request.json['course_id']
        activity = request.json['activity']
        content = request.json['content']
        theoreticalHour = request.json['theoreticalHour']
        practiceHour = request.json['practiceHour']
        eLearningHour = request.json['eLearningHour']
        
        print(theoreticalHour,practiceHour,eLearningHour)

        new_courseActivity = courseActivity(course_id, activity, content, theoreticalHour, practiceHour, eLearningHour)

        db.session.add(new_courseActivity)

        db.session.commit()

        return "Actividad de curso guardada"
    except Exception as e:
        print(e)
        return {"message": "Error al ingresar una actividad al curso"}, 500

@app.route('/api/tellerPerCourse', methods = ['POST'])
def addtellerPerCourse():
    try:
        teller_id = request.json['teller_id']
        course_id = request.json['course_id']

        new_tellerPerCourse = tellerPerCourse(teller_id, course_id)

        db.session.add(new_tellerPerCourse)

        db.session.commit()

        return "ids guardados"

    except Exception as e:
        print(e)
        return {"message": "Error al obtener los id's"}, 500



@app.route('/api/courseComplement', methods = ['POST'])
def addcourseComplement():
    try:
        course_id = request.json['course_id']
        type_id = request.json['type_id']
        description = request.json['description']
        amount = request.json['amount']

        new_courseComplement = courseComplement(course_id, type_id, description, amount)

        db.session.add(new_courseComplement)

        db.session.commit()

        return "complementos guardados"

    except Exception as e:
        print(e)
        return {"message": "Error al obtener los complementos del curso"}, 500

#Se carga el host


SQLAlchemy(app)

