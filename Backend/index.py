from app import app
from database.db import db
import sqlalchemy as sa
from sqlalchemy import insert
from database.config import DevelopmentConfig
from models.userRole import *
from models.templatesEmail import *
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
    
    if(bool(UserRole.query.filter_by(name='teller_with_upload').first()) == False):
        #Se crea la tabla con los roles
        randomID = StringGenerator(
                "[\l\d]{20}").render_list(1, unique=True)[0]
        newRandomID = "3" + randomID #Se crea el identificador random, ver como hacerlo mas único
        _id = 3
        identifierRol = newRandomID
        name = "teller_with_upload"
    
        new_user_rol = UserRole(_id, name, identifierRol)
        db.session.add(new_user_rol)
        db.session.commit()

    if(bool(UserRole.query.filter_by(name='admin').first()) == False):

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




#----------------------------------------Templates Email

    if(bool(TemplatesEmail.query.filter_by(title='Enviar Clave Empresa').first()) == False):

        _id = 1
        title = 'Enviar Clave Empresa'
        subject = '-'
        content = '-'

        new_templates_email = TemplatesEmail(_id, title, subject, content)
        db.session.add(new_templates_email)
        db.session.commit()


    if(bool(TemplatesEmail.query.filter_by(title='Enviar Clave Participante').first()) == False):

        _id = 2
        title = 'Enviar Clave Participante'
        subject = '-'
        content = '-'

        new_templates_email = TemplatesEmail(_id, title, subject, content)
        db.session.add(new_templates_email)
        db.session.commit()


    if(bool(TemplatesEmail.query.filter_by(title='Enviar Clave a Relator Inicio de Curso').first()) == False):

        _id = 3
        title = 'Enviar Clave a Relator Inicio de Curso'
        subject = '-'
        content = '-'

        new_templates_email = TemplatesEmail(_id, title, subject, content)
        db.session.add(new_templates_email)
        db.session.commit()

    if(bool(TemplatesEmail.query.filter_by(title='Enviar Declaración Jurada Participante').first()) == False):

        _id = 4
        title = 'Enviar Declaración Jurada Participante'
        subject = '-'
        content = '-'

        new_templates_email = TemplatesEmail(_id, title, subject, content)
        db.session.add(new_templates_email)
        db.session.commit()

    if(bool(TemplatesEmail.query.filter_by(title='Enviar Diploma al Participante').first()) == False):

        _id = 5
        title = 'Enviar Diploma al Participante'
        subject = '-'
        content = '-'

        new_templates_email = TemplatesEmail(_id, title, subject, content)
        db.session.add(new_templates_email)
        db.session.commit()


    if(bool(TemplatesEmail.query.filter_by(title='Enviar Clave Participante - Para Participantes con SENCE').first()) == False):

        _id = 6
        title = 'Enviar Clave Participante - Para Participantes con SENCE'
        subject = '-'
        content = '-'

        new_templates_email = TemplatesEmail(_id, title, subject, content)
        db.session.add(new_templates_email)
        db.session.commit()


    if(bool(TemplatesEmail.query.filter_by(title='Curso Finalizado o Por Finalizar - Alumnos sin SENCE').first()) == False):

        _id = 7
        title = 'Curso Finalizado o Por Finalizar - Alumnos sin SENCE'
        subject = '-'
        content = '-'

        new_templates_email = TemplatesEmail(_id, title, subject, content)
        db.session.add(new_templates_email)
        db.session.commit()


    if(bool(TemplatesEmail.query.filter_by(title='Curso Finalizado o Por Finalizar - Alumnos con SENCE').first()) == False):

        _id = 8
        title = 'Curso Finalizado o Por Finalizar - Alumnos con SENCE'
        subject = '-'
        content = '-'

        new_templates_email = TemplatesEmail(_id, title, subject, content)
        db.session.add(new_templates_email)
        db.session.commit()

    
    if(bool(TemplatesEmail.query.filter_by(title='Enviar Encuesta Satisfacción').first()) == False):

        _id = 9
        title = 'Enviar Encuesta Satisfacción'
        subject = '-'
        content = '-'

        new_templates_email = TemplatesEmail(_id, title, subject, content)
        db.session.add(new_templates_email)
        db.session.commit()

    db.create_all()    

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
