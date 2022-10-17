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

from resources.login import Login
from resources.teller import Teller
from resources.company import Company
from resources.participant import Participant
from resources.course import Course


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


#Se carga raiz
@app.route('/')
def index():
    return render_template('index.html')


#Se carga el host

SQLAlchemy(app)

