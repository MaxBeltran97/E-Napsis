import flask
from flask import request
from models.user import *
from models.userRole import *
from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager, verify_jwt_in_request
from werkzeug.security import generate_password_hash, check_password_hash




login = flask.Blueprint('login', __name__)



@login.route('/api/login', methods=["POST"])
def signup_post():
    try:
        user_requested = request.json['username']
        print('a')
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


