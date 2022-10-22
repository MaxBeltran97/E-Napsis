import sys
import os
import click
import json
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

from models.teller import Teller as modelTeller
from models.teller import teller_schema
from models.teller import tellers_schema

from models.participant import Participant as modelParticipant
from models.participant import participant_schema
from models.participant import participants_schema

from models.company import Company as modelCompany
from models.company import company_schema
from models.company import companys_schema

from models.course import Course as modelCourse
from models.course import course_schema
from models.course import courses_schema

from models.courseTellerSupport import *
from models.courseParticipantMaterial import *

from models.courseActvity import courseActivity
from models.tellerPerCourse import tellerPerCourse
from models.courseComplement import courseComplement


from resources.login import Login
# from resources.UploadParticipants import UploadParticipants


# IMPORTACIÓN DE RECURSOS
app = Flask(__name__)
CORS(app)
ma = Marshmallow(app)

# Se establece enviroment como argumento
#enviroment = sys.argv[1]
enviroment = "development"
#enviroment = "production"


# Se setean variables de configuración según ambient(env)
app.config.from_object(app_config[enviroment])
api = Api(app)


# Endpoints y la clase que se encargará de procesar cada solicitud

api.add_resource(Login, '/login')

#api.add_resource(Teller, '/api/teller')

#api.add_resource(Company, '/api/company')

#api.add_resource(Participant, '/api/participant')

#api.add_resource(Course, '/api/course')

#api.add_resource(UploadParticipants, '/api/UploadParticipants')


# Se carga raiz
@app.route('/')
def index():
    return render_template('index.html')

# --------------------------------------------RUTAS


# --------------------------------------------TELLER

@app.route('/api/teller', methods=['POST'])
def add_teller():
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

        new_teller = modelTeller(nationalityType, rut, fullName, lastName, motherLastName, nationality,
                                 birthday, profession, email, cellPhone, maritalStatus, address, region, commune, situation, reuf)

        db.session.add(new_teller)
        db.session.commit()
        return {
            "ok": True,
            "teller": new_teller.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar el relator"
        }, 500
    finally:
        db.session.close()


@app.route('/api/teller', methods=['GET'])
def get_tellers():
    try:
        all_tellers = modelTeller.query.all()
        result = tellers_schema.dump(all_tellers)
        return {
            "ok": True,
            "tellers": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los relatores"
        }, 500


@app.route('/api/teller/<_id>', methods=['GET'])
def get_teller(_id):
    try:
        teller = modelTeller.query.get(_id)
        return {
            "ok": True,
            "teller": teller.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el relator"
        }, 500


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
        return {
            "ok": True,
            "teller": teller.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el relator"
        }, 500
    finally:
        db.session.close()


@app.route('/api/teller/<_id>', methods=['DELETE'])
def delete_teller(_id):
    try:
        teller = modelTeller.query.get(_id)

        db.session.delete(teller)
        db.session.commit()
        return {
            "ok": True,
            "teller": teller.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el relator"
        }, 500
    finally:
        db.session.close()


# --------------------------------------------PARTICIPANT


@app.route('/api/participant', methods=['POST'])
def add_participant():
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

        new_participant = modelParticipant(courseCode, participantType, company_id, nationalityType,
                                           rut, fullName, lastName, motherLastName, institution, email, gender, position)

        db.session.add(new_participant)
        db.session.commit()
        return {
            "ok": True,
            "participant": new_participant.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar el participante"
        }, 500
    finally:
        db.session.close()


@app.route('/api/participant', methods=['GET'])
def get_participants():
    try:
        all_participants = modelParticipant.query.all()
        result = participants_schema.dump(all_participants)
        return {
            "ok": True,
            "participants": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los participantes"
        }, 500


@app.route('/api/participant/<_id>', methods=['GET'])
def get_participant(_id):
    try:
        participant = modelParticipant.query.get(_id)
        return {
            "ok": True,
            "participant": participant.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el participante"
        }, 500


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
        return {
            "ok": True,
            "participant": participant.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el participante"
        }, 500
    finally:
        db.session.close()


@app.route('/api/participant/<_id>', methods=['DELETE'])
def delete_participant(_id):
    try:
        participant = modelParticipant.query.get(_id)

        db.session.delete(participant)
        db.session.commit()
        return {
            "ok": True,
            "participant": participant.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el participante"
        }, 500
    finally:
        db.session.close()


# --------------------------------------------COMPANY

@app.route('/api/company', methods=['POST'])
def add_company():
    try:
        rut = request.json['rut']
        socialReason = request.json['socialReason']
        fantasyName = request.json['fantasyName']
        giro = request.json['giro']
        address = request.json['address']
        region = request.json['region']
        commune = request.json['commune']
        city = request.json['city']
        contactName = request.json['contactName']
        cellPhone = request.json['cellPhone']
        position = request.json['position']
        email = request.json['email']

        new_company = modelCompany(rut, socialReason, fantasyName, giro, address,
                                   region, commune, city, contactName, cellPhone, position, email)

        db.session.add(new_company)
        db.session.commit()
        return {
            "ok": True,
            "company": new_company.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar la compañia"
        }, 500
    finally:
        db.session.close()


@app.route('/api/company', methods=['GET'])
def get_companys():
    try:
        all_companys = modelCompany.query.all()
        result = companys_schema.dump(all_companys)
        return {
            "ok": True,
            "companies": result
        }, 200
    except Exception as e:
        return {
            "ok": False,
            "msg": "Error al obtener las compañias"
        }, 500


@app.route('/api/company/<_id>', methods=['GET'])
def get_company(_id):
    try:
        company = modelCompany.query.get(_id)
        return {
            "ok": True,
            "company": company.serialize()
        }, 200
    except Exception as e:
        return {
            "ok": False,
            "msg": "Error al obtener la compañia"
        }, 500


@app.route('/api/company/<_id>', methods=['PUT'])
def update_company(_id):
    try:
        company = modelCompany.query.get(_id)

        rut = request.json['rut']
        socialReason = request.json['socialReason']
        fantasyName = request.json['fantasyName']
        giro = request.json['giro']
        address = request.json['address']
        region = request.json['region']
        commune = request.json['commune']
        city = request.json['city']
        contactName = request.json['contactName']
        cellPhone = request.json['cellPhone']
        position = request.json['position']
        email = request.json['email']

        company.rut = rut
        company.socialReason = socialReason
        company.fantasyName = fantasyName
        company.giro = giro
        company.address = address
        company.region = region
        company.commune = commune
        company.city = city
        company.contactName = contactName
        company.cellPhone = cellPhone
        company.position = position
        company.email = email

        db.session.commit()
        return {
            "ok": True,
            "company": company.serialize()
        }, 200
    except Exception as e:
        return {
            "ok": False,
            "msg": "Error al actualizar la compañia"
        }, 500
    finally:
        db.session.close()


@app.route('/api/company/<_id>', methods=['DELETE'])
def delete_company(_id):
    try:
        company = modelCompany.query.get(_id)

        db.session.delete(company)
        db.session.commit()
        return {
            "ok": True,
            "company": company.serialize()
        }, 200
    except Exception as e:
        return {
            "ok": False,
            "msg": "Error al eliminar la compañia"
        }, 500
    finally:
        db.session.close()

# --------------------------------------------COURSES


@app.route('/api/course', methods=['POST'])
def add_courses():
    try:
        sence = request.json['sence']
        instruction = request.json['instruction']
        activityType = request.json['activityType']
        activityName = request.json['activityName']
        attendance = request.json['attendance']
        minCalification = request.json['minCalification']
        minHours = request.json['minHours']
        participantsNumber = request.json['participantsNumber']
        targetPopulation = request.json['targetPopulation']
        generalObjectives = request.json['generalObjectives']
        totalHours = request.json['totalHours']
        teachingTechnique = request.json['teachingTechnique']
        evaluation = request.json['evaluation']
        infrastructure = request.json['infrastructure']
        participantValue = request.json['participantValue']
        requestDate = request.json['requestDate']


        new_course = modelCourse(sence, instruction, activityType, activityName, attendance, minCalification, minHours, participantsNumber,
                                 targetPopulation, generalObjectives, totalHours, teachingTechnique, evaluation, infrastructure, participantValue, requestDate)

        db.session.add(new_course)
        db.session.commit()

        # Obtener datos para las otras tablas
        tellerSupport = request.json['tellerSupport']
        for item in tellerSupport:
            try:
                new_courseTellerSupport = CourseTellerSupport(new_course._id, item['description'], item['amount'])

                db.session.add(new_courseTellerSupport)
                db.session.commit()
            except Exception as e:
                print(e)

        participantMaterial = request.json['participantMaterial']
        for item in participantMaterial:
            try:
                new_courseParticipantMaterial = CourseParticipantMaterial(new_course._id, item['description'], item['amount'])

                db.session.add(new_courseParticipantMaterial)
                db.session.commit()
            except Exception as e:
                print(e)

        # Heinz
        # db.session.remove()

        return {
            "ok": True,
            "course": new_course.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al agregar el curso"
        }, 500
    finally:
        db.session.close()


@app.route('/api/course', methods=['GET'])
def get_courses():
    try:
        all_courses = modelCourse.query.all()
        result = courses_schema.dump(all_courses)
        return {
            "ok": True,
            "courses": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los cursos"
        }, 500


@app.route('/api/course/<_id>', methods=['GET'])
def get_course(_id):
    try:
        course = modelCourse.query.get(_id)
        return {
            "ok": True,
            "course": course.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el curso"
        }, 500


@app.route('/api/course/<_id>', methods=['PUT'])
def update_course(_id):
    try:
        course = modelCourse.query.get(_id)

        sence = request.json['sence']
        instruction = request.json['instruction']
        activityType = request.json['activityType']
        activityName = request.json['activityName']
        attendance = request.json['attendance']
        minCalification = request.json['minCalification']
        minHours = request.json['minHours']
        participantsNumber = request.json['participantsNumber']
        targetPopulation = request.json['targetPopulation']
        generalObjectives = request.json['generalObjectives']
        totalHours = request.json['totalHours']
        teachingTechnique = request.json['teachingTechnique']
        evaluation = request.json['evaluation']
        infrastructure = request.json['infrastructure']
        participantValue = request.json['participantValue']
        requestDate = request.json['requestDate']

        course.sence = sence
        course.instruction = instruction
        course.activityType = activityType
        course.activityName = activityName
        course.attendance = attendance
        course.minCalification = minCalification
        course.minHours = minHours
        course.participantsNumber = participantsNumber
        course.targetPopulation = targetPopulation
        course.generalObjectives = generalObjectives
        course.totalHours = totalHours
        course.teachingTechnique = teachingTechnique
        course.evaluation = evaluation
        course.infrastructure = infrastructure
        course.participantValue = participantValue
        course.requestDate = requestDate

        db.session.commit()
        return {
            "ok": True,
            "course": course.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el curso"
        }, 500
    finally:
        db.session.close()


@app.route('/api/course/<_id>', methods=['DELETE'])
def delete_course(_id):
    try:
        course = modelCourse.query.get(_id)

        db.session.delete(course)
        db.session.commit()
        return {
            "ok": True,
            "course": course.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el curso"
        }, 500
    finally:
        db.session.close()


# --------------------------------------------


@app.route('/api/courseActivity', methods=['POST'])
def addcourseActivity():
    try:
        course_id = request.json['course_id']
        activity = request.json['activity']
        content = request.json['content']
        theoreticalHour = request.json['theoreticalHour']
        practiceHour = request.json['practiceHour']
        eLearningHour = request.json['eLearningHour']

        print(theoreticalHour, practiceHour, eLearningHour)

        new_courseActivity = courseActivity(
            course_id, activity, content, theoreticalHour, practiceHour, eLearningHour)

        db.session.add(new_courseActivity)

        db.session.commit()

        return "Actividad de curso guardada"
    except Exception as e:
        print(e)
        return {"message": "Error al ingresar una actividad al curso"}, 500


@app.route('/api/tellerPerCourse', methods=['POST'])
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


# @app.route('/api/courseComplement', methods=['POST'])
# def addcourseComplement():
#     try:
#         course_id = request.json['course_id']
#         type_id = request.json['type_id']
#         description = request.json['description']
#         amount = request.json['amount']

#         new_courseComplement = courseComplement(
#             course_id, type_id, description, amount)

#         db.session.add(new_courseComplement)

#         db.session.commit()

#         return "complementos guardados"

#     except Exception as e:
#         print(e)
#         return {"message": "Error al obtener los complementos del curso"}, 500


# Se carga el host
SQLAlchemy(app)
