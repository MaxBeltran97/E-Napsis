import flask
from flask import request
from database.config import Config
from models.user import *
from models.userRole import *
from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager, verify_jwt_in_request
from werkzeug.security import generate_password_hash, check_password_hash
from email.message import EmailMessage
import ssl
import smtplib



login = flask.Blueprint('login', __name__)

#jwt = JWTManager(login)



@login.route('/api/login', methods=["POST"])
def signup_post():
    try:
        user_requested = request.json['username']
        print(user_requested)
        password = request.json['password']
        isEmail = False

        #now = datetime.now() + timedelta(days=1)

        # verifica si es username o email
        for i in user_requested:
            if (i == '@'):
                isEmail = True

        if (isEmail == True):
            user = User.query.filter_by(email=user_requested).first()

            # verifica que exista el usuario con esa contraseña
            if user and check_password_hash(user.password, password):
                # access_token = create_access_token(
                #     identity=user_requested, expires_delta=now)
                access_token = create_access_token(
                    identity=user_requested)

                data = user.serialize()
                del data['password']

                return {
                    "ok": True,
                    "user": data,
                    "token": access_token,
                }
            else:
                return {
                    "ok": False,
                    "msg": "Usuario y/o Contraseña Incorrectos"
                }
        else:
            # verifica que exista el usuario con esa contraseña
            user = User.query.filter_by(username=user_requested).first()
            if user and check_password_hash(user.password, password):
                # access_token = create_access_token(
                #     identity=user_requested, expires_delta=now)
                access_token = create_access_token(
                    identity=user_requested)
                data = user.serialize()
                del data['password']

                return {
                    "ok": True,
                    "user": data,
                    "token": access_token
                }
            else:
                return {
                    "ok": False,
                    "msg": "Usuario y/o Contraseña Incorrectos"
                }

    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error en el login"
        }, 500


@login.route('/api/user/role/<_id>', methods=['GET'])
def get_role(_id):
    try:
        user_role = UserRole.query.get(_id)
        data = user_role.serialize()
        # access_token_valid = verify_jwt_in_request()
        # print(access_token_valid)

        return {
            "ok": True,
            "role": data.get('name')
        }
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el rol"
        }, 500

@login.route('/api/mailSending/<_id>', methods=['GET'])
def send_mail(_id):
    try:
        user = User.query.get(_id)
        data = user.serialize()
        emailReceptor = data.get('email')
        emailEmisor = Config.EMAIL
        emailContrasena = Config.EMAIL_PASSWORD
        user = data.get('username')
        password = 'contraseña no hasheada'
        
        
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
        
        return {
            "ok": True,
        }
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al mandar el correo"
        }, 500
