import sys,os,click,json
from turtle import position
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, reqparse
from flask_mysqldb import MySQL
from sqlalchemy import create_engine, null



from redis_app import redis
from database.db import db
from database.config import app_config, DevelopmentConfig
import pandas as pd



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

from models.calendarCourse import CalendarCourse as modelCalendar
from models.calendarCourse import calendar_schema
from models.calendarCourse import calendars_schema

from models.courseActvity import courseActivity
from models.tellerPerCourse import tellerPerCourse
from models.courseComplement import courseComplement


from resources.login import Login



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

#api.add_resource(Company, '/api/company')

#api.add_resource(Participant, '/api/participant')

#api.add_resource(Course, '/api/course')

#api.add_resource(UploadParticipants, '/api/UploadParticipants')

   

#Se carga raiz
@app.route('/')
def index():
    return render_template('index.html')

#--------------------------------------------RUTAS


#--------------------------------------------TELLER

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

        

#--------------------------------------------COMPANY


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

        new_company = modelCompany(rut, socialReason, fantasyName, giro, address, region, commune, city, contactName, cellPhone, position, email)

        db.session.add(new_company)

        db.session.commit()

        return company_schema.jsonify(new_company)

    except Exception as e:
            print(e)
            return {"message": "Error al ingresar una compañía."}, 500

@app.route('/api/company', methods=['GET'])
def get_companys():

    try:
        all_companys = modelCompany.query.all()
        result = companys_schema.dump(all_companys)
        return jsonify(result)

    except Exception as e:
            print(e)
            return {"message": "Error al obtener las compañías."}, 500    

@app.route('/api/company/<_id>', methods=['GET'])
def get_company(_id):
    
    try:

        company = modelCompany.query.get(_id)
        return company_schema.jsonify(company)

    except Exception as e:
            print(e)
            return {"message": "Error al obtener una compañía."}, 500

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
        return company_schema.jsonify(company)

    except Exception as e:
            print(e)
            return {"message": "Error al actualizar una compañía."}, 500

@app.route('/api/company/<_id>', methods=['DELETE'])
def delete_company(_id):
    
    try:

        company = modelCompany.query.get(_id)
        db.session.delete(company)
        db.session.commit()

        return company_schema.jsonify(company)

    except Exception as e:
            print(e)
            return {"message": "Error al eliminar una compañía."}, 500


#--------------------------------------------COURSES

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
   
        new_course = modelCourse(sence, instruction, activityType, activityName, attendance, minCalification, minHours, participantsNumber, targetPopulation, generalObjectives, totalHours, teachingTechnique, evaluation, infrastructure, participantValue, requestDate)  

        #Heinz
        db.session.remove()

        db.session.add(new_course)

        db.session.commit()

        return course_schema.jsonify(new_course)

    except Exception as e:
            print(e)
            return {"message": "Error al ingresar un curso."}, 500

@app.route('/api/course', methods=['GET'])
def get_courses():

    try:
        all_courses = modelCourse.query.all()
        result = courses_schema.dump(all_courses)
        return jsonify(result)


    except Exception as e:
            print(e)
            return {"message": "Error al obtener los cursos."}, 500

@app.route('/api/course/<_id>', methods=['GET'])
def get_course(_id):

    try:

        course = modelCourse.query.get(_id)
        return course_schema.jsonify(course)


    except Exception as e:
            print(e)
            return {"message": "Error al obtener el curso."}, 500

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
        return course_schema.jsonify(course)



    except Exception as e:
            print(e)
            return {"message": "Error al actualizar un curso."}, 500

@app.route('/api/course/<_id>', methods=['DELETE'])
def delete_course(_id):

    try:
        course = modelCourse.query.get(_id)
        db.session.delete(course)
        db.session.commit()

        return participant_schema.jsonify(course)

    except Exception as e:
            print(e)
            return {"message": "Error al eliminar un curso."}, 500



#--------------------------------------------CALENDAR

@app.route('/api/calendar', methods = ['POST'])
def add_calendar():
    try:
        internalCode = request.json['internalCode']
        internalName = request.json['internalName']
        course_id = request.json['course_id']
        instruction = request.json['instruction']
        courseHours = request.json['courseHours']
        ejecutionPlace = request.json['ejecutionPlace']
        ejecutionCity = request.json['ejecutionCity']
        ejecutionRegion = request.json['ejecutionRegion']
        startDate = request.json['startDate']
        participantValue = request.json['participantValue']


        new_calendar = modelCalendar(internalCode, internalName, course_id, instruction, courseHours, ejecutionPlace, ejecutionCity, ejecutionRegion, startDate, participantValue)

        db.session.add(new_calendar)

        db.session.commit()

        return calendar_schema.jsonify(new_calendar)


    except Exception as e:
            print(e)
            return {"message": "Error al ingresar un calendario."}, 500

@app.route('/api/calendar', methods=['GET'])
def get_calendars():

    try:
        all_calendars = modelCalendar.query.all()
        result = calendars_schema.dump(all_calendars)
        return jsonify(result)


    except Exception as e:
            print(e)
            return {"message": "Error al obtener los calendario."}, 500

@app.route('/api/calendar/<_id>', methods=['GET'])
def get_calendar(_id):

    try:

        calendar = modelCalendar.query.get(_id)
        return calendar_schema.jsonify(calendar)

    except Exception as e:
        print(e)
        return {"message": "Error al obtener un calendario."}, 500 

@app.route('/api/calendar/<_id>', methods=['PUT'])
def update_calendar(_id):

    try:

        calendar = modelCalendar.query.get(_id)

        internalCode = request.json['internalCode']
        internalName = request.json['internalName']
        course_id = request.json['course_id']
        instruction = request.json['instruction']
        courseHours = request.json['courseHours']
        ejecutionPlace = request.json['ejecutionPlace']
        ejecutionCity = request.json['ejecutionCity']
        ejecutionRegion = request.json['ejecutionRegion']
        startDate = request.json['startDate']
        participantValue = request.json['participantValue']

        calendar.internalCode = internalCode
        calendar.internalName = internalName
        calendar.course_id = course_id
        calendar.instruction = instruction
        calendar.courseHours = courseHours
        calendar.ejecutionPlace = ejecutionPlace
        calendar.ejecutionCity = ejecutionCity
        calendar.ejecutionRegion = ejecutionRegion
        calendar.startDate = startDate
        calendar.participantValue = participantValue

        db.session.commit()

        return calendar_schema.jsonify(calendar)

    except Exception as e:
            print(e)
            return {"message": "Error al actualizar el calendario."}, 500

@app.route('/api/calendar/<_id>', methods=['DELETE'])
def delete_calendar(_id):

    try:
        calendar = modelCalendar.query.get(_id)
        db.session.delete(calendar)
        db.session.commit()

        return calendar_schema.jsonify(calendar)

    except Exception as e:
            print(e)
            return {"message": "Error al eliminar un relator."}, 500


#--------------------------------------------

@app.route('/api/UploadParticipants', methods=['POST'])
def upload_participants():
    try:
        
        courseCode = request.form['courseCode']
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
                new_participant = modelParticipant(courseCode, participantType, company_id, nationalityType, rut, fullName, lastName, motherLastName, institution, email, gender, position)
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
            print (e)
            return {"message": "Error al ingresar archivo."}, 500

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

