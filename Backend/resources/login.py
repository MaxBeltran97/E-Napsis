

import json
from flask import Flask, request, jsonify
from flask_restful import Resource, reqparse
from helpers.sesion import Sesion

class Login(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
        type=str,
        required=True,
        help="Debe ingresar un nombre de usuario"
    )
    parser.add_argument('password',
        type=str,
        required=True,
        help="Debe ingresar una contrasena."
    )

    def post(self):
        data = Login.parser.parse_args()
        try:
            password = data['password']
            username = data['username']
            token_id = Sesion.generar_tokenid(username,password)
            print(token_id)
            return {"token":token_id, "usuario":username}
        except Exception as e:
            return {"message": "Ha ocurrido un error de conexión."}, 500


    def get(self):
        try:
            if request.headers.get('token_id'):
                es_valido = Sesion.validar_token(request.headers.get('token_id'))
                if es_valido == False:
                    return {'message' :'Acceso denegado'}, 500
                else:
                    return {'status' : True}
            else:
                return {'message' :'Acceso denegado'}, 500

        except Exception as e:
            return {"message": "Ha ocurrido un error de conexión."}, 500