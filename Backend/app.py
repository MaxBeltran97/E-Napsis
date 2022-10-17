from distutils.command.upload import upload
import sys,os,click,json
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_mysqldb import MySQL


from redis_app import redis
from database.db import db
from database.config import app_config, DevelopmentConfig
from helpers.sesion import Sesion

from models.company import Company
from models.participant import Participant
from models.teller import Teller
from models.courseActvity import courseActivity
from models.tellerPerCourse import tellerPerCourse
from models.courseComplement import courseComplement

from resources.login import Login
from resources.teller import Teller
from resources.company import Company
from resources.participant import Participant
from resources.course import Course
from resources.UploadParticipants import UploadParticipants


# IMPORTACIÓN DE RECURSOS
app = Flask(__name__)
CORS(app)


#Se establece enviroment como argumento
#enviroment = sys.argv[1]
enviroment = "development"
#enviroment = "production"


#Se setean variables de configuración según ambient(env)
app.config.from_object(app_config[enviroment])
api = Api(app)


#Endpoints y la clase que se encargará de procesar cada solicitud

api.add_resource(Login, '/login')

api.add_resource(Teller, '/api/teller')

api.add_resource(Company, '/api/company')

api.add_resource(Participant, '/api/participant')

api.add_resource(Course, '/api/course')

api.add_resource(UploadParticipants, '/api/UploadParticipants')

   

#Se carga raiz
@app.route('/')
def index():
    return render_template('index.html')


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

