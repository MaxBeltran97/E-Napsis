import json
from models.participant import Participant as modelParticipant
from flask import Flask, request, jsonify
from flask_restful import Resource, reqparse
from database.db import db




class Participant(Resource):

    parser = reqparse.RequestParser()

    parser.add_argument('courseCode',
        type=str,
        required=True,
        help="Debe ingresar el código del curso"
    )

    parser.add_argument('participantType',
        type=str,
        required=False,
        help="Debe ingresar el tipo de participante"
    )

    parser.add_argument('company_id',
        type=int,
        required=False,
        help="Debe ingresar la el id de la compañia"
    )

    parser.add_argument('nationalityType',
        type=str,
        required=False,
        help="Debe ingresar su tipo de nacionalidad"
    )

    parser.add_argument('rut',
        type=str,
        required=True,
        help="Debe ingresar el rut del participante"
    )

    parser.add_argument('fullName',
        type=str,
        required=True,
        help="Debe ingresar el nombre del participante"
    )

    parser.add_argument('lastName',
        type=str,
        required=True,
        help="Debe ingresar el apellido paterno del participante"
    )

    parser.add_argument('motherLastName',
        type=str,
        required=False,
        help="Debe ingresar el apellido materno del participante"
    )

    parser.add_argument('institution',
        type=str,
        required=False,
        help="Debe ingresar la institución del participante"
    )

    parser.add_argument('email',
        type=str,
        required=False,
        help="Debe ingresar el email del participante"
    )

    parser.add_argument('gender',
        type=str,
        required=False,
        help="Debe ingresar el genero del participante"
    )

    parser.add_argument('position',
        type=str,
        required=False,
        help="Debe ingresar la posición del participante"
    )



    def post(self):
        data = Participant.parser.parse_args()
        try:
            courseCode = data['courseCode']
            participantType = data['participantType']
            company_id = data['company_id']
            nationalityType = data['nationalityType']
            rut = data['rut']
            fullName = data['fullName']
            lastName = data['lastName']
            motherLastName = data['motherLastName']
            institution = data['institution']
            email = data['email']
            gender = data['gender']
            position = data['position']

            new_participant = modelParticipant(courseCode, participantType, company_id, nationalityType, rut, fullName, lastName, motherLastName, institution, email, gender, position)

            db.session.add(new_participant)

            db.session.commit()

            return {"message": "Participante guardado con éxito :)"}
        except Exception as e:
            print(e)
            return {"message": "Error al ingresar participante."}, 500



    def get(self):
        try: 
            participant = modelParticipant.query.all()
            return jsonify(modelParticipant.serialize_list(participant))
        except Exception as e:
            print(e)
            return {"message": "Error al obtener participantes."}, 500
