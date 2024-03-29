from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager, verify_jwt_in_request
from flask import Flask, render_template


from routes.tellersRoute import tellers
from routes.participantsRoute import participants
from routes.companiesRoute import companies
from routes.coursesRoute import courses
from routes.calendarsRoute import calendars
from routes.usersRoute import users
from routes.loginRoute import login
from routes.holidaysRoute import holidays
from routes.templatesEmailRoute import templatesEmail
from routes.privilegeRoute import privilege
from routes.companyDataRoute import companyData
from routes.contractRoute import contract
from routes.automaticNoticesRoute import automaticNotice
from routes.checkListRoute import checklist
from routes.logoRoute import logos
from routes.calendarEvaluationRoute import evaluation
from routes.calendarAttendanceRoute import calendarAttendance
from routes.classBookRoute import classBook

from database.config import app_config
from database.db import db
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api



# IMPORTACIÓN DE RECURSOS
app = Flask(__name__)
CORS(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

# Se establece enviroment como argumento
#enviroment = "development"
enviroment = "production"

# Se setean variables de configuración según ambient(env)

app.config.from_object(app_config[enviroment])
api = Api(app)


# Se carga raiz
@app.route('/')
def index():
    return render_template('index.html')

# --------------------------------------------RUTAS

app.register_blueprint(tellers)

app.register_blueprint(participants)

app.register_blueprint(companies)

app.register_blueprint(courses)

app.register_blueprint(calendars)

app.register_blueprint(users)

app.register_blueprint(login)

app.register_blueprint(holidays)

app.register_blueprint(templatesEmail)

app.register_blueprint(privilege)

app.register_blueprint(companyData)

app.register_blueprint(contract)

app.register_blueprint(automaticNotice)

app.register_blueprint(checklist)

app.register_blueprint(logos)

app.register_blueprint(evaluation)

app.register_blueprint(calendarAttendance)

app.register_blueprint(classBook)
# Se carga el host
SQLAlchemy(app)