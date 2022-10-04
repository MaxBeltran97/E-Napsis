from datetime import date
import json
from models.teller import Teller as modelTeller
from flask import Flask, request, jsonify
from flask_restful import Resource, reqparse
from database.db import db



class Teller(Resource):
    
    parser = reqparse.RequestParser()
    
    parser.add_argument('nationalityType',
        type=str,
        required=False,
        help="Debe ingresar el tipo de nacionalidad"
    )
    parser.add_argument('rut',
        type=str,
        required=True,
        help="Debe ingresar un rut."
    )

    parser.add_argument('fullName',
        type=str,
        required=True,
        help="Debe ingresar sus dos nombres."
    )
    
    parser.add_argument('lastName',
        type=str,
        required=True,
        help="Debe ingresar su apellido paterno."
    )
    parser.add_argument('motherLastName',
        type=str,
        required=True,
        help="Debe ingresar su apellido materno."
    )
    parser.add_argument('nationality',
        type=str,
        required=False,
        help="Debe ingresar su nacionalidad."
    )
    parser.add_argument('birthday',
        type=str,
        required=False,
        help="Debe ingresar un birthday."
    )
    parser.add_argument('profession',
        type=str,
        required=True,
        help="Debe ingresar su profesion."
    )
    parser.add_argument('email',
        type=str,
        required=True,
        help="Debe ingresar su email."
    )
    parser.add_argument('cellPhone',
        type=int,
        required=False,
        help="Debe ingresar su numero celular"
    )
    parser.add_argument('maritalStatus',
        type=str,
        required=False,
        help="Debe ingresar su estado civil"
    )
    parser.add_argument('address',
        type=str,
        required=False,
        help="Debe ingresar su direccion"
    )
    parser.add_argument('region',
        type=str,
        required=False,
        help="Debe ingresar su region"
    )
    parser.add_argument('commune',
        type=str,
        required=False,
        help="Debe ingresar su comuna"
    )
    parser.add_argument('situation',
        type=bool,
        required=False,
        help="Debe ingresar su estado"
    )
    parser.add_argument('reuf',
        type=bool,
        required=False,
        help="Debe ingresar reuf"
    )
    parser.add_argument('uploadFiles',
        type=bool,
        required=False
    )

    

    def post(self):
        data = Teller.parser.parse_args()
        try:
            
            nationalityType = data['nationalityType']
            rut = data['rut']
            fullName = data['fullName']
            lastName = data['lastName']
            motherLastName = data['motherLastName']
            nationality = data['nationality']
            birthday = data['birthday']
            profession = data['profession']
            email = data['email']
            cellPhone = data['cellPhone']
            maritalStatus = data['maritalStatus']
            address = data['address']
            region = data['region']
            commune = data['commune']
            situation = data['situation']
            reuf = data['reuf']

            # TODO: variable para un tipo de rol de Relator
            # uploadFiles = data['uploadFiles']

            new_teller = modelTeller(nationalityType, rut, fullName, lastName, motherLastName, nationality, birthday, profession, email, cellPhone, maritalStatus, address, region, commune, situation, reuf)

            db.session.add(new_teller)
    
            db.session.commit()

            return {"message": "Relator guardado con exito :)."}
        except Exception as e:
            print(e)
            return {"message": "Error al ingresar un relator."}, 500


    def get(self):
        try:
            id = request.args.get('id')
            print(id)
            teller = modelTeller.query.all()
            return jsonify(modelTeller.serialize_list(teller))
        except Exception as e:
            print(e)
            return {"message": "Error al obtener relatores."}, 500

    
    # def put(self):
    #     try:

        

    #     except:


    # def delete(self):
    #     try:

    #     except: