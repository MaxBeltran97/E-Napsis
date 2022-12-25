import flask
from flask import request
from models.user import *
from models.userRole import *
from werkzeug.security import generate_password_hash, check_password_hash
from database.config import Config
from email.message import EmailMessage
import ssl
import smtplib




users = flask.Blueprint('users', __name__)

# --------------------------------------------USUARIO

@users.route('/api/user/', methods=['POST'])
def add_user():
    try:
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        avatar = request.json['avatar']
        role = request.json['role']
        hashed_password = generate_password_hash(password, method='sha256')

        new_user = User(username, hashed_password, email, avatar, role)

        emailEmisor = Config.EMAIL
        emailContrasena = Config.EMAIL_PASSWORD
        emailReceptor = email
        user = username
        print(user)
        
        asunto = 'Clave de Acceso Napsis'
        cuerpo = f'''Estimado(a) {user}:

        le hacemos entrega de su usuario y clave para el acceso a Napsis.   
            Usuario: {user}    Clave: {password}'''
        
        em = EmailMessage()
        em['From'] = emailEmisor
        em['To'] = emailReceptor
        em['Subject'] = asunto
        em.set_content(cuerpo)

        contexto = ssl.create_default_context()

        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=contexto) as smtp:
            smtp.login(emailEmisor, emailContrasena)
            smtp.sendmail(emailEmisor, emailReceptor, em.as_string())



        db.session.add(new_user)
        db.session.commit()
        return {
            "ok": True,
            "user": new_user.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar el usuario"
        }, 500
    finally:
        db.session.close()


@users.route('/api/user/', methods=['GET'])
def get_users():
    try:
        all_user = User.query.all()
        result = users_schema.dump(all_user)
        return {
            "ok": True,
            "users": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los usuarios"
        }, 500


@users.route('/api/user/<_id>', methods=['GET'])
def get_user(_id):
    try:
        user = User.query.get(_id)
        return {
            "ok": True,
            "user": user.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el usuario"
        }, 500


@users.route('/api/user/<_id>', methods=['PUT'])
def update_user(_id):
    try:
        user = User.query.get(_id)

        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        role = request.json['role']
        avatar = request.json['avatar']

        user.username = username
        user.password = password
        user.email = email
        user.role = role
        user.avatar = avatar

        db.session.commit()
        return {
            "ok": True,
            "user": user.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el usuario"
        }, 500
    finally:
        db.session.close()


@users.route('/api/user/<_id>', methods=['DELETE'])
def delete_user(_id):
    try:
        user = User.query.get(_id)

        db.session.delete(user)
        db.session.commit()
        return {
            "ok": True,
            "user": user.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el user"
        }, 500
    finally:
        db.session.close()

