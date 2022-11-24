from app import app
from database.db import db
import sqlalchemy as sa
from sqlalchemy import insert
from database.config import DevelopmentConfig
from models.userRole import *
from strgen import StringGenerator

db.init_app(app)
with app.app_context():

    engine = sa.create_engine(DevelopmentConfig.SQLALCHEMY_DATABASE_URI)
    insp = sa.inspect(engine)
   
    #print(bool(UserRole.query.filter_by(name='coordinador').first())) #Verifica si la tabla rol contiene el nombre de coordinador
    
    #insp.has_table("user_rol", schema="napsis") #Verifica si la tabla de roles existe(True)


    if (insp.has_table("user_rol", schema="napsis") == False):
        db.create_all()

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

    db.create_all()    

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
