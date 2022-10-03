import json
from models.company import Company as modelCompany
from flask import Flask, request, jsonify
from flask_restful import Resource, reqparse
from database.db import db




class Company(Resource):

    parser = reqparse.RequestParser()

    parser.add_argument('rut',
        type=str,
        required=False,
        help="Debe ingresar el rut de la empresa"
    )

    parser.add_argument('socialReason',
        type=str,
        required=True,
        help="Debe ingresar la razon social"
    )

    parser.add_argument('fantasyName',
        type=str,
        required=True,
        help="Debe ingresar el nombre de fantasia"
    )

    parser.add_argument('turn',
        type=str,
        required=True,
        help="Debe ingresar el giro"
    )

    parser.add_argument('address',
        type=str,
        required=True,
        help="debe ingresar la direccion de la empresa"
    )

    parser.add_argument('region',
        type=str,
        required=True,
        help="Debe ingresar la region"
    )

    parser.add_argument('commune',
        type=str,
        required=True,
        help="Debe ingresar la comuna"
    )

    parser.add_argument('city',
        type=str,
        required=True,
        help="Debe ingresar la ciudad"
    )

    parser.add_argument('contactName',
        type=str,
        required=False,
        help="Debe ingresar el nombre de contacto"
    )

    parser.add_argument('cellPhone',
        type=int,
        required=False,
        help="Debe ingresar el tipo de nacionalidad"
    )

    parser.add_argument('position',
        type=str,
        required=False,
        help="Debe ingresar la posicion"
    )

    parser.add_argument('email',
        type=str,
        required=False,
        help="Debe ingresar el email de la empresa"
    )

    def post(self):
        data = Company.parser.parse_args()
        try:
            rut = data['rut']
            socialReason = data['socialReason']
            fantasyName = data['fantasyName']
            turn = data['turn']
            address = data['address']
            region = data['region']
            commune = data['commune']
            city = data['city']
            contactName = data['contactName']
            cellPhone = data['cellPhone']
            position = data['position']
            email = data['email']

            new_company = modelCompany(rut, socialReason, fantasyName, turn, address, region, commune, city, contactName, cellPhone, position, email)

            db.session.add(new_company)

            db.session.commit()

            return {"message": "Compañia guardada con éxito :)"}
        except Exception as e:
            print(e)
            return {"message": "Error al ingresar la compañía."}, 500

    def get(self):
        try:
            company = modelCompany.query.all()
            return jsonify(modelCompany.serialize_list(company))
        except Exception as e:
            print(e)
            return {"message": "Error al obtener las compañías."}, 500