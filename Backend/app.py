import sys
import os
import json
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select
from flask_restful import Api
from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager 
import secrets
import string

from redis_app import redis
from database.db import db
from database.config import app_config, DevelopmentConfig
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from strgen import StringGenerator
import pandas as pd
from random import randrange
from helpers.sesion import Sesion


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

from models.calendarCourse import CalendarCourse as modelCalendarCourse
from models.calendarCourse import calendar_course_schema
from models.calendarCourse import calendar_course_schemas

from models.user import *
from models.courseTellerSupport import *
from models.courseParticipantMaterial import *
from models.courseEquipment import *
from models.courseActvityContentHours import *
from models.courseTeller import *
from models.tellerUploadFile import *
from models.calendarCourseUploadFile import *
from models.calendarCourseEvaluation import *
from models.userRol import *


from resources.login import Login
# from resources.UploadParticipants import UploadParticipants


# IMPORTACIÓN DE RECURSOS
app = Flask(__name__)
CORS(app)
ma = Marshmallow(app)
app.config["UPLOAD_FOLDER_TELLER"] = "assets/tellerFiles"
app.config["UPLOAD_FOLDER_CALENDAR"] = "assets/calendarFiles"
ALLOWED_EXTENSIONS = set(["pdf", "docx", "png", "jpg"])
jwt = JWTManager(app)

# Se establece enviroment como argumento
# enviroment = "development"
enviroment = "production"

# Se setean variables de configuración según ambient(env)
app.config.from_object(app_config[enviroment])
api = Api(app)


# Endpoints y la clase que se encargará de procesar cada solicitud

#api.add_resource(Login, '/login')

# api.add_resource(Teller, '/api/teller')

# api.add_resource(Company, '/api/company')

# api.add_resource(Participant, '/api/participant')

# api.add_resource(Course, '/api/course')

# api.add_resource(UploadParticipants, '/api/UploadParticipants')


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

         
        
        
        alphabet = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(alphabet) for i in range(10))
        avatar = "a"
        i = 1
        
        usernameGenerated = fullName[0].lower() + lastName.title()

        users = User.query.filter_by(username=usernameGenerated)
        
        
        if(users.count() == 1):
            usernameGenerated = fullName[0:3].lower() + lastName.title()
            users = User.query.filter_by(username=usernameGenerated)
            if(users.count() == 1):
                while(True):
                    usernameGenerated = fullName[0:3].lower() + lastName.title() + str(i)
                    users = User.query.filter_by(username=usernameGenerated)
                    if (users.count() == 0):
                        break
                    i += 1

        new_user = User(usernameGenerated, password, email=email, avatar = avatar, rol = '1KVt92kkGGb5hNjPEYJ9Q')

        db.session.add(new_user)
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


@app.route('/api/teller/uploadfile', methods=['POST'])
def upload_file_teller():
    try:
        file = request.files["uploadFile"]
        teller_id = request.form["teller_id"]
        name = request.form["name"]

        filesplit = file.filename.split('.')
        extension = filesplit[len(filesplit)-1]

        flag = True
        while (flag):
            try:
                randomName = StringGenerator(
                    "[\l\d]{20}").render_list(1, unique=True)[0]
                nuevoNombreFile = teller_id + randomName + "." + extension
                new_tellerUpload = TellerUploadFile(
                    teller_id, name, nuevoNombreFile)
                db.session.add(new_tellerUpload)
                db.session.commit()
                file.save(os.path.join(
                    app.config["UPLOAD_FOLDER_TELLER"], nuevoNombreFile))
                flag = False
            except Exception as e:
                db.session.rollback()
            finally:
                db.session.close()

        return {
            "ok": True,
            "msg": "Archivo Subido"
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al subir un archivo"
        }, 500


# --------------------------------------------PARTICIPANT


@app.route('/api/participant', methods=['POST'])
def add_participant():
    try:
        calendarCourse_id = request.json['calendarCourse_id']
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

        new_participant = modelParticipant(calendarCourse_id, participantType, company_id, nationalityType,
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

        calendarCourse_id = request.json['calendarCourse_id']
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

        participant.calendarCourse_id = calendarCourse_id
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


@app.route('/api/participant/uploadfile', methods=['POST'])
def upload_file_participants():
    try:
        print('entre')
        calendarCourse_id = request.form['calendarCourse_id']
        company_id = request.form['company_id']
        file = request.files["excel"]

        msg = "posiciones duplicadas: "
        df = pd.read_excel(file)

        for i in range(len(df.index)):
            nationalityType = df.loc[i, 'NACIONALIDAD']
            participantType = df.loc[i, 'CARGO DESEMPEÑADO']
            rut = df.loc[i, 'RUT']
            fullName = df.loc[i, 'NOMBRE']
            lastName = df.loc[i, 'PATERNO']
            motherLastName = df.loc[i, 'MATERNO']
            institution = df.loc[i, 'ESTABLECIMIENTO']
            email = df.loc[i, 'EMAIL']
            gender = df.loc[i, 'GENERO']
            position = df.loc[i, 'POSICION']

            try:
                new_participant = modelParticipant(calendarCourse_id, participantType, company_id, nationalityType,
                                                   rut, fullName, lastName, motherLastName, institution, email, gender, position)
                db.session.add(new_participant)
                db.session.commit()
            except Exception as e:
                msg = (msg + f"{i}, ")
                db.session.rollback()
            finally:
                db.session.close()

        return {
            "ok": True,
            "msg": msg
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al subir el archivo"
        }, 500

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

# Agregar los datos al curso enviado


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
        activitiesContentHours = request.json['activitiesContentHours']
        for item in activitiesContentHours:
            try:
                new_courseActivityContentHours = CourseActivityContentHours(
                    new_course._id, item['activity'], item['content'], item['theoreticalHour'], item['practiceHour'], item['eLearningHour'])

                db.session.add(new_courseActivityContentHours)
                db.session.commit()
            except Exception as e:
                print(e)

        tellers_id = request.json['tellers_id']
        for item in tellers_id:
            try:
                new_courseTeller = CourseTeller(
                    new_course._id, item['teller_id'])

                db.session.add(new_courseTeller)
                db.session.commit()
            except Exception as e:
                print(e)

        tellerSupport = request.json['tellerSupport']
        for item in tellerSupport:
            try:
                new_courseTellerSupport = CourseTellerSupport(
                    new_course._id, item['description'], item['amount'])

                db.session.add(new_courseTellerSupport)
                db.session.commit()
            except Exception as e:
                print(e)

        participantMaterial = request.json['participantMaterial']
        for item in participantMaterial:
            try:
                new_courseParticipantMaterial = CourseParticipantMaterial(
                    new_course._id, item['description'], item['amount'])

                db.session.add(new_courseParticipantMaterial)
                db.session.commit()
            except Exception as e:
                print(e)

        equipment = request.json['equipment']
        for item in equipment:
            try:
                new_courseEquipment = CourseEquipment(
                    new_course._id, item['description'], item['amount'])

                db.session.add(new_courseEquipment)
                db.session.commit()
            except Exception as e:
                print(e)


        courseSerialized = new_course.serialize()
        CourseActivityContentHoursDB = CourseActivityContentHours.query.filter_by(
            course_id=new_course._id)
        courseActivityContentHourList = course_course_activity_content_hours_schemas.dump(
            CourseActivityContentHoursDB)
        courseSerialized['activitiesContentHours'] = courseActivityContentHourList

        CourseEquipmentDB = CourseEquipment.query.filter_by(
            course_id=new_course._id)
        CourseEquipmentList = course_equipment_schemas.dump(CourseEquipmentDB)
        courseSerialized['equipment'] = CourseEquipmentList

        CourseParticipantMaterialDB = CourseParticipantMaterial.query.filter_by(
            course_id=new_course._id)
        CourseParticipantMaterialList = course_participant_material_schemas.dump(
            CourseParticipantMaterialDB)
        courseSerialized['participantMaterial'] = CourseParticipantMaterialList

        CourseTellerDB = CourseTeller.query.filter_by(
            course_id=new_course._id)
        CourseTellerList = course_teller_schemas.dump(CourseTellerDB)
        courseSerialized['tellers_id'] = CourseTellerList

        CourseTellerSupportDB = CourseTellerSupport.query.filter_by(
            course_id=new_course._id)
        CourseTellerSupportList = course_teller_support_schemas.dump(
            CourseTellerSupportDB)
        courseSerialized['tellerSupport'] = CourseTellerSupportList

        return {
            "ok": True,
            "course": courseSerialized
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al agregar el curso"
        }, 500
    finally:
        db.session.close()

# Agregar los datos a cada curso


@app.route('/api/course', methods=['GET'])
def get_courses():
    try:
        all_courses = modelCourse.query.all()
        result = courses_schema.dump(all_courses)
        for item in result:
            CourseActivityContentHoursDB = CourseActivityContentHours.query.filter_by(
                course_id=item.get('_id'))
            courseActivityContentHourList = course_course_activity_content_hours_schemas.dump(
                CourseActivityContentHoursDB)
            item['activitiesContentHours'] = courseActivityContentHourList

            CourseEquipmentDB = CourseEquipment.query.filter_by(
                course_id=item.get('_id'))
            CourseEquipmentList = course_equipment_schemas.dump(
                CourseEquipmentDB)
            item['equipment'] = CourseEquipmentList

            CourseParticipantMaterialDB = CourseParticipantMaterial.query.filter_by(
                course_id=item.get('_id'))
            CourseParticipantMaterialList = course_participant_material_schemas.dump(
                CourseParticipantMaterialDB)
            item['participantMaterial'] = CourseParticipantMaterialList

            CourseTellerDB = CourseTeller.query.filter_by(
                course_id=item.get('_id'))
            CourseTellerList = course_teller_schemas.dump(CourseTellerDB)
            item['tellers_id'] = CourseTellerList

            CourseTellerSupportDB = CourseTellerSupport.query.filter_by(
                course_id=item.get('_id'))
            CourseTellerSupportList = course_teller_support_schemas.dump(
                CourseTellerSupportDB)
            item['tellerSupport'] = CourseTellerSupportList

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

# Agregar los datos al curso enviado


@app.route('/api/course/<_id>', methods=['GET'])
def get_course(_id):
    try:
        course = modelCourse.query.get(_id)
        courseSerialized = course.serialize()
        CourseActivityContentHoursDB = CourseActivityContentHours.query.filter_by(
            course_id=course._id)
        courseActivityContentHourList = course_course_activity_content_hours_schemas.dump(
            CourseActivityContentHoursDB)
        courseSerialized['activitiesContentHours'] = courseActivityContentHourList

        CourseEquipmentDB = CourseEquipment.query.filter_by(
            course_id=course._id)
        CourseEquipmentList = course_equipment_schemas.dump(CourseEquipmentDB)
        courseSerialized['equipment'] = CourseEquipmentList

        CourseParticipantMaterialDB = CourseParticipantMaterial.query.filter_by(
            course_id=course._id)
        CourseParticipantMaterialList = course_participant_material_schemas.dump(
            CourseParticipantMaterialDB)
        courseSerialized['participantMaterial'] = CourseParticipantMaterialList

        CourseTellerDB = CourseTeller.query.filter_by(
            course_id=course._id)
        CourseTellerList = course_teller_schemas.dump(CourseTellerDB)
        courseSerialized['tellers_id'] = CourseTellerList

        CourseTellerSupportDB = CourseTellerSupport.query.filter_by(
            course_id=course._id)
        CourseTellerSupportList = course_teller_support_schemas.dump(
            CourseTellerSupportDB)
        courseSerialized['tellerSupport'] = CourseTellerSupportList

        return {
            "ok": True,
            "course": courseSerialized
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el curso"
        }, 500

# Actualizar las tablas adyacentes eliminando actualizando y agregando
# Agregar los datos al curso enviado


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

# ----------------------------ACTUALIZACIÓN DE LAS ACTIVIDADES
#
        activitiesContentHours = request.json['activitiesContentHours']
        activitiesContentHoursDB = CourseActivityContentHours.query.filter_by(
            course_id=course._id)

        # Si existe se actualiza, sino, se elimina

        for itemDB in activitiesContentHoursDB:
            flag = False
            for item in activitiesContentHours:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    itemDB.activity = item['activity']
                    itemDB.content = item['content']
                    itemDB.theoreticalHour = item['theoreticalHour']
                    itemDB.practiceHour = item['practiceHour']
                    itemDB.eLearningHour = item['eLearningHour']
                    db.session.commit()
                    break
            if (flag == False):
                db.session.delete(itemDB)
                db.session.commit()

        # Los nuevos que no poseen id se agregan
        for item in activitiesContentHours:

            if (item.get('_id') == None):
                try:
                    new_courseActivityContentHours = CourseActivityContentHours(
                        course._id, item['activity'], item['content'], item['theoreticalHour'], item['practiceHour'], item['eLearningHour'])

                    db.session.add(new_courseActivityContentHours)
                    db.session.commit()
                except Exception as e:
                    print(e)

# ----------------------------ACTUALIZACIÓN DE LOS TELLERS

        tellers_id = request.json['tellers_id']
        tellers_idDB = CourseTeller.query.filter_by(
            course_id=course._id)

        for itemDB in tellers_idDB:
            flag = False
            for item in tellers_id:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    break
            if flag == False:
                db.session.delete(itemDB)
                db.session.commit()

        for item in tellers_id:

            if (item.get('_id') == None):
                try:
                    new_courseTeller = CourseTeller(
                        course._id, item['teller_id'])

                    db.session.add(new_courseTeller)
                    db.session.commit()
                except Exception as e:
                    print(e)

# ----------------------------ACTUALIZACIÓN DE LOS TELLERS SUPPORT

        tellerSupport = request.json['tellerSupport']
        tellerSupportDB = CourseTellerSupport.query.filter_by(
            course_id=course._id)

        for itemDB in tellerSupportDB:
            flag = False
            for item in tellerSupport:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    itemDB.description = item['description']
                    itemDB.amount = item['amount']
                    db.session.commit()
                    break
            if (flag == False):
                db.session.delete(itemDB)
                db.session.commit()

        for item in tellerSupport:

            if (item.get('_id') == None):
                try:
                    new_courseTellerSupport = CourseTellerSupport(
                        course._id, item['description'], item['amount'])

                    db.session.add(new_courseTellerSupport)
                    db.session.commit()
                except Exception as e:
                    print(e)

# ----------------------------ACTUALIZACIÓN DEl MATERIAL DEL PARTICIPANTE

        participantMaterial = request.json['participantMaterial']
        participanteMaterialDB = CourseParticipantMaterial.query.filter_by(
            course_id=course._id)

        for itemDB in participanteMaterialDB:
            flag = False
            for item in participantMaterial:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    itemDB.description = item['description']
                    itemDB.amount = item['amount']
                    db.session.commit()
                    break
            if (flag == False):
                db.session.delete(itemDB)
                db.session.commit()

        for item in participantMaterial:

            if (item.get('_id') == None):
                try:
                    new_courseParticipantMaterial = CourseParticipantMaterial(
                        course._id, item['description'], item['amount'])

                    db.session.add(new_courseParticipantMaterial)
                    db.session.commit()
                except Exception as e:
                    print(e)

# ----------------------------ACTUALIZACIÓN DEl EQUIPAMIENTO

        equipment = request.json['equipment']
        equipmentDB = CourseEquipment.query.filter_by(
            course_id=course._id)

        for itemDB in equipmentDB:
            flag = False
            for item in equipment:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    itemDB.description = item['description']
                    itemDB.amount = item['amount']
                    db.session.commit()
                    break
            if flag == False:
                db.session.delete(itemDB)
                db.session.commit()

        for item in equipment:

            if (item.get('_id') == None):
                try:
                    new_courseEquipment = CourseEquipment(
                        course._id, item['description'], item['amount'])

                    db.session.add(new_courseEquipment)
                    db.session.commit()
                except Exception as e:
                    print(e)

# -----------------------------------------------------------
        courseSerialized = course.serialize()
        CourseActivityContentHoursDB = CourseActivityContentHours.query.filter_by(
            course_id=course._id)
        courseActivityContentHourList = course_course_activity_content_hours_schemas.dump(
            CourseActivityContentHoursDB)
        courseSerialized['activitiesContentHours'] = courseActivityContentHourList

        CourseEquipmentDB = CourseEquipment.query.filter_by(
            course_id=course._id)
        CourseEquipmentList = course_equipment_schemas.dump(CourseEquipmentDB)
        courseSerialized['equipment'] = CourseEquipmentList

        CourseParticipantMaterialDB = CourseParticipantMaterial.query.filter_by(
            course_id=course._id)
        CourseParticipantMaterialList = course_participant_material_schemas.dump(
            CourseParticipantMaterialDB)
        courseSerialized['participantMaterial'] = CourseParticipantMaterialList

        CourseTellerDB = CourseTeller.query.filter_by(
            course_id=course._id)
        CourseTellerList = course_teller_schemas.dump(CourseTellerDB)
        courseSerialized['tellers_id'] = CourseTellerList

        CourseTellerSupportDB = CourseTellerSupport.query.filter_by(
            course_id=course._id)
        CourseTellerSupportList = course_teller_support_schemas.dump(
            CourseTellerSupportDB)
        courseSerialized['tellerSupport'] = CourseTellerSupportList

        return {
            "ok": True,
            "course": courseSerialized
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el curso"
        }, 500
    finally:
        db.session.close()

# Eliminar las tablas adyacentes al eliminar el curso


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

# --------------------------------------------CALENDAR


@app.route('/api/calendar', methods=['POST'])
def add_calendar():
    try:
        internalCode = request.json['internalCode']
        internalName = request.json['internalName']
        course_id = request.json['course_id']
        instruction = request.json['instruction']
        courseTotalHours = request.json['courseTotalHours']
        ejecutionPlace = request.json['ejecutionPlace']
        ejecutionCity = request.json['ejecutionCity']
        ejecutionRegion = request.json['ejecutionRegion']
        startDate = request.json['startDate']
        endDate = request.json['endDate']
        participantValue = request.json['participantValue']

        new_calendarCourse = modelCalendarCourse(internalCode, internalName, course_id, instruction, courseTotalHours,
                                                 ejecutionPlace, ejecutionCity, ejecutionRegion, startDate, endDate, participantValue)

        db.session.add(new_calendarCourse)
        db.session.commit()

        # Obtener datos para las otras tablas
        evaluationDates = request.json['evaluationDates']
        for item in evaluationDates:
            try:
                new_calendarCourseEvaluation = CalendarCourseEvaluation(
                    new_calendarCourse._id, item['evaluationDate'], item['percentage'])

                db.session.add(new_calendarCourseEvaluation)
                db.session.commit()
            except Exception as e:
                print(e)

        courseEvaluationDB = CalendarCourseEvaluation.query.filter_by(
            calendarCourse_id=new_calendarCourse._id)

        calendarCourseSerialized = new_calendarCourse.serialize()
        courseEvaluationList = calendarCourseEvaluations_schemas.dump(
            courseEvaluationDB)
        calendarCourseSerialized["evaluationDates"] = courseEvaluationList

        return {
            "ok": True,
            "calendarCourse": calendarCourseSerialized
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al calendarizar un curso"
        }, 500
    finally:
        db.session.close()


@app.route('/api/calendar', methods=['GET'])
def get_calendars():
    try:
        all_calendarCourses = modelCalendarCourse.query.all()
        result = calendar_course_schemas.dump(all_calendarCourses)
        for item in result:
            courseEvaluationDB = CalendarCourseEvaluation.query.filter_by(
                calendarCourse_id=item.get('_id'))
            courseEvaluationList = calendarCourseEvaluations_schemas.dump(
                courseEvaluationDB)
            item["evaluationDates"] = courseEvaluationList

        return {
            "ok": True,
            "calendarCourses": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener cursos calendarizados"
        }, 500


@app.route('/api/calendar/<_id>', methods=['GET'])
def get_calendar(_id):
    try:
        calendarCourse = modelCalendarCourse.query.get(_id)
        courseEvaluationDB = CalendarCourseEvaluation.query.filter_by(
            calendarCourse_id=calendarCourse._id)

        calendarCourseSerialized = calendarCourse.serialize()
        courseEvaluationList = calendarCourseEvaluations_schemas.dump(
            courseEvaluationDB)
        calendarCourseSerialized["evaluationDates"] = courseEvaluationList

        return {
            "ok": True,
            "calendarCourse": calendarCourseSerialized
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el curso calendarizado"
        }, 500


@app.route('/api/calendar/<_id>', methods=['PUT'])
def update_calendar(_id):
    try:
        calendarCourse = modelCalendarCourse.query.get(_id)

        internalCode = request.json['internalCode']
        internalName = request.json['internalName']
        course_id = request.json['course_id']
        instruction = request.json['instruction']
        courseTotalHours = request.json['courseTotalHours']
        ejecutionPlace = request.json['ejecutionPlace']
        ejecutionCity = request.json['ejecutionCity']
        ejecutionRegion = request.json['ejecutionRegion']
        startDate = request.json['startDate']
        endDate = request.json['endDate']
        participantValue = request.json['participantValue']

        calendarCourse.internalCode = internalCode
        calendarCourse.internalName = internalName
        calendarCourse.course_id = course_id
        calendarCourse.instruction = instruction
        calendarCourse.courseTotalHours = courseTotalHours
        calendarCourse.ejecutionPlace = ejecutionPlace
        calendarCourse.ejecutionCity = ejecutionCity
        calendarCourse.ejecutionRegion = ejecutionRegion
        calendarCourse.startDate = startDate
        calendarCourse.endDate = endDate
        calendarCourse.participantValue = participantValue

        db.session.commit()

        courseEvaluation = request.json['evaluationDates']
        courseEvaluationDB = CalendarCourseEvaluation.query.filter_by(
            calendarCourse_id=calendarCourse._id)

        # Si existe se actualiza, sino, se elimina

        for itemDB in courseEvaluationDB:
            flag = False
            for item in courseEvaluation:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    itemDB.evaluationDate = item['evaluationDate']
                    itemDB.percentage = item['percentage']
                    db.session.commit()
                    break
            if (flag == False):
                db.session.delete(itemDB)
                db.session.commit()

        # Los nuevos que no poseen id se agregan
        for item in courseEvaluation:
            if (item.get('_id') == None):
                try:
                    new_calendarCourseEvaluation = CalendarCourseEvaluation(
                        calendarCourse._id, item['evaluationDate'], item['percentage'])

                    db.session.add(new_calendarCourseEvaluation)
                    db.session.commit()
                except Exception as e:
                    print(e)

        courseEvaluationDB = CalendarCourseEvaluation.query.filter_by(
            calendarCourse_id=calendarCourse._id)

        calendarCourseSerialized = calendarCourse.serialize()
        courseEvaluationList = calendarCourseEvaluations_schemas.dump(
            courseEvaluationDB)
        calendarCourseSerialized["evaluationDates"] = courseEvaluationList

        return {
            "ok": True,
            "calendarCourse": calendarCourseSerialized
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el curso calendarizado"
        }, 500


@app.route('/api/calendar/<_id>', methods=['DELETE'])
def delete_calendar(_id):
    try:
        calendarCourse = modelCalendarCourse.query.get(_id)

        db.session.delete(calendarCourse)
        db.session.commit()
        return {
            "ok": True,
            "calendarCourse": calendarCourse.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el curso calendarizado"
        }, 500


@app.route('/api/calendar/uploadfile', methods=['POST'])
def upload_file_calendar():
    try:
        file = request.files["uploadFile"]
        calendarCourse_id = request.form["calendarCourse_id"]
        name = request.form["name"]

        filesplit = file.filename.split('.')
        extension = filesplit[len(filesplit)-1]

        flag = True
        while (flag):
            try:
                randomName = StringGenerator(
                    "[\l\d]{20}").render_list(1, unique=True)[0]
                nuevoNombreFile = calendarCourse_id + randomName + "." + extension
                new_calendarCourseUpload = CalendarCourseUploadFile(
                    calendarCourse_id, name, nuevoNombreFile)
                db.session.add(new_calendarCourseUpload)
                db.session.commit()
                file.save(os.path.join(
                    app.config["UPLOAD_FOLDER_CALENDAR"], nuevoNombreFile))
                flag = False
            except Exception as e:
                db.session.rollback()
            finally:
                db.session.close()

        return {
            "ok": True,
            "msg": "Archivo Subido"
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al subir un archivo"
        }, 500


# --------------------------------------------USUARIO

@app.route('/api/user/', methods=['POST'])
def add_user():
    try:
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        avatar = request.json['avatar']
        rol = request.json['rol']
        hashed_password = generate_password_hash(password, method='sha256')

        new_user = User(username, hashed_password, email, avatar, rol)

        db.session.add(new_user)
        db.session.commit()
        return {
            "ok": True,
            "participant": new_user.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar el usuario"
        }, 500
    finally:
        db.session.close()


@app.route('/api/user/', methods=['GET'])
def get_users():
    try:
        all_user = User.query.all()
        result = users_schema.dump(all_user)
        return {
            "ok": True,
            "participants": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los usuarios"
        }, 500


@app.route('/api/user/<_id>', methods=['GET'])
def get_user(_id):
    try:
        user = User.query.get(_id)
        return {
            "ok": True,
            "participant": user.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el usuario"
        }, 500


@app.route('/api/user/<_id>', methods=['PUT'])
def update_user(_id):
    try:
        user = User.query.get(_id)

        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        rol = request.json['rol']
        avatar = request.json['avatar']

        user.username = username
        user.password = password
        user.email = email
        user.rol = rol
        user.avatar = avatar
        
        db.session.commit()
        return {
            "ok": True,
            "participant": user.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el usuario"
        }, 500
    finally:
        db.session.close()


@app.route('/api/user/<_id>', methods=['DELETE'])
def delete_user(_id):
    try:
        user = User.query.get(_id)

        db.session.delete(user)
        db.session.commit()
        return {
            "ok": True,
            "participant": user.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el user"
        }, 500
    finally:
        db.session.close() 


# --------------------------------------------LOGIN

@app.route('/api/login', methods=["POST"])
def signup_post():
    try:
        user_requested = request.json['username']
        password = request.json['password']
        isEmail = False

        #verifica si es username o email
        for i in user_requested:
            if (i == '@'):
                isEmail = True        
        
        if (isEmail == True):
            user = User.query.filter_by(email=user_requested).first()

            #verifica que exista el usuario con esa contraseña
            if user and check_password_hash(user.password, password):
                    access_token = create_access_token(identity=user_requested)
                    data = user.serialize()
                    del data['password']

                    return{
                        "ok": True,
                        "username": data,
                        "token": access_token,

                    }                   
            else:
                    return {
                        "ok": False,
                        "msg": "Usuario no encontrado"
                    }
        else:
            #verifica que exista el usuario con esa contraseña
            user = User.query.filter_by(username=user_requested).first()
            if user and check_password_hash(user.password, password):
                    access_token = create_access_token(identity=user_requested)
                    data = user.serialize()
                    del data['password']
                    
                    return{
                        "ok": True,
                        "username": data,
                        "token": access_token
                    }

    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error en el login"
        }, 500


@app.route('/api/userRoles/<_id>', methods=['GET'])
def get_rol(_id):
    try:
        user_rol = UserRol.query.get(_id)
        data = user_rol.serialize()
        return {
            "ok": True,
            "rol": data.get('name')
        }
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el rol"
        }, 500

# --------------------------------------------



# Se carga el host
SQLAlchemy(app)
