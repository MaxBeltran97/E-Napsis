from app import app
from database.db import db
import sqlalchemy as sa
from sqlalchemy import insert
from database.config import DevelopmentConfig
from models.userRole import *
from models.templatesEmail import *
from models.privilege import *
from models.userRolePrivilege import *
from strgen import StringGenerator

db.init_app(app)



with app.app_context():

    engine = sa.create_engine(DevelopmentConfig.SQLALCHEMY_DATABASE_URI)
    insp = sa.inspect(engine)

    #print(bool(UserRole.query.filter_by(name='coordinador').first())) #Verifica si la tabla rol contiene el nombre de coordinador

    #insp.has_table("user_rol", schema="napsis") #Verifica si la tabla de roles existe(True)



#----------------------------------------Creación de Tablas

    if (insp.has_table("user_rol", schema="napsis") == False):
        db.create_all()

    if (insp.has_table("templates_email", schema="napsis") == False):
        db.create_all()

    if (insp.has_table("privilege", schema="napsis") == False):
        db.create_all()


#----------------------------------------Privilege

    namePrivilege = ['addCompany', 'showCompany', 'modifyCompany', 'deleteCompany',
    'addCourse', 'showCourse', 'modifyCourse', 'deleteCourse', 'addParticipant', 'showParticipant',
    'modifyParticipant', 'deleteParticipant', 'importParticipant', 'sendKeyParticipant',
    'showClassBook', 'attendanceClassBook', 'evaluationsClassBook', 'finalReportClassBook',
    'addTeller', 'showTeller', 'modifyTeller', 'deleteTeller', 'documentsTeller', 'sendKeyTeller',
    'addCourseCalendar', 'showCourseCalendar', 'modifyCourseCalendar', 'deleteCourseCalendar', 'classDatesCourseCalendar',
    'checkListCourseCalendar', 'addParticipantsCourseCalendar']

    for i in range (len(namePrivilege)):
        if(bool(Privilege.query.filter_by(name=namePrivilege[i]).first()) == False):
            _id = i + 1
            name = namePrivilege[i]
            print(namePrivilege[i])
            new_privilege = Privilege(_id, name)
            db.session.add(new_privilege)
            db.session.commit()





#----------------------------------------User Roles


    if(bool(UserRole.query.filter_by(name='coordinator').first()) == False):
        #Se crea la tabla con los roles
        randomID = StringGenerator(
                "[\l\d]{20}").render_list(1, unique=True)[0]
        newRandomID = "1" + randomID #Se crea el identificador random, ver como hacerlo mas único
        _id = 1
        identifierRol = newRandomID
        name = "coordinator"

        new_user_rol = UserRole(_id, name, identifierRol)
        db.session.add(new_user_rol)
        db.session.commit()

    if(bool(UserRole.query.filter_by(name='teller').first()) == False):
        #Se crea la tabla con los roles
        randomID = StringGenerator(
                "[\l\d]{20}").render_list(1, unique=True)[0]
        newRandomID = "2" + randomID #Se crea el identificador random, ver como hacerlo mas único
        _id = 2
        identifierRol = newRandomID
        name = "teller"

        new_user_rol = UserRole(_id, name, identifierRol)
        db.session.add(new_user_rol)
        db.session.commit()

    admin = UserRole.query.filter_by(name='admin').first()

    if(bool(admin) == False):


        #Se crea la tabla con los roles
        randomID = StringGenerator(
                "[\l\d]{20}").render_list(1, unique=True)[0]
        newRandomID = "4" + randomID #Se crea el identificador random, ver como hacerlo mas único
        _id = 4
        identifierRol = newRandomID
        name = "admin"



        new_user_rol = UserRole(_id, name, identifierRol)
        db.session.add(new_user_rol)
        db.session.commit()

        all_privileges = Privilege.query.all()
        for i in all_privileges:
            new_user_rol_privilege = UserRolePrivilege(new_user_rol._id, i._id)
            db.session.add(new_user_rol_privilege)
            db.session.commit()

#----------------------------------------Templates Email


    nameTemplatesEmail = ['Enviar Clave Empresa', 'Enviar Clave Participante', 'Enviar Clave a Relator Inicio de Curso',
    'Enviar Declaración Jurada Participante', 'Enviar Diploma al Participante', 'Enviar Clave Participante - Para Participantes con SENCE',
    'Curso Finalizado o Por Finalizar - Alumnos sin SENCE', 'Curso Finalizado o Por Finalizar - Alumnos con SENCE', 'Enviar Encuesta Satisfacción']


    for i in range(len(nameTemplatesEmail)):
        if(bool(TemplatesEmail.query.filter_by(title=nameTemplatesEmail[i]).first()) == False):
            _id = i + 1
            title = nameTemplatesEmail[i]
            subject = '-'
            content = '-'
            new_templates_email = TemplatesEmail(_id, title, subject, content)
            db.session.add(new_templates_email)
            db.session.commit()


    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
