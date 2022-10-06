import json
from models.course import Course as modelCourse
from flask import Flask, request, jsonify
from flask_restful import Resource, reqparse
from database.db import db




class Course(Resource):

    parser = reqparse.RequestParser()

    parser.add_argument('sense',
        type=str,
        required=True,
        help="Debe ingresar el Sense"
    )

    parser.add_argument('instruction',
        type=str,
        required=True,
        help="Debe ingresar la modalidad del curso"
    )

    parser.add_argument('activityType',
        type=str,
        required=False,
        help="Debe ingresar el tipo de actividad"
    )

    parser.add_argument('activityName',
        type=str,
        required=True,
        help="Debe ingresar el nombre de la actividad"
    )

    parser.add_argument('attendence',
        type=str,
        required=True,
        help="Debe ingresar la asistencia del curso"
    )

    parser.add_argument('minCalification',
        type=float,
        required=False,
        help="Debe ingresar la califación mínima para aprobar el curso"
    )

    parser.add_argument('minHours',
        type=int,
        required=False,
        help="Debe ingresar el mínimo de horas del curso"
    )

    parser.add_argument('participantsNumber',
        type=int,
        required=False,
        help="Debe ingresar el número de participantes"
    )

    parser.add_argument('targetPopulation',
        type=str,
        required=False,
        help="Debe ingresar la población objetivo"
    )

    parser.add_argument('generalObjectives',
        type=str,
        required=False,
        help="Debe ingresar los objetivos generales"
    )

    parser.add_argument('totalHours',
        type=int,
        required=True,
        help="Debe ingresar el número total de horas"
    )

    parser.add_argument('teachingTechnique',
        type=str,
        required=False,
        help="Debe ingresar la técnica de aprendizaje"
    )

    parser.add_argument('evaluation',
        type=str,
        required=True,
        help="Debe ingresar la evaluación del curso"
    )

    parser.add_argument('infrastructure',
        type=str,
        required=False,
        help="Debe ingresar la infrastructura del curso"
    )

    parser.add_argument('participantValue',
        type=int,
        required=True,
        help="Debe ingresar el valor del participante"
    )

    parser.add_argument('requestDate',
        type=str,
        required=True,
        help="Debe ingresar la fecha requerida"
    )

    def post(self):
        data = Course.parser.parse_args()
        try:
            sense = data['sense']
            instruction = data['instruction']
            activityType = data['activityType']
            activityName = data['activityName']
            attendence = data['attendence']
            minCalification = data['minCalification']
            minHours = data['minHours']
            participantsNumber = data['participantsNumber']
            targetPopulation = data['targetPopulation']
            generalObjectives = data['generalObjectives']
            totalHours = data['totalHours']
            teachingTechnique = data['teachingTechnique']
            evaluation = data['evaluation']
            infrastructure = data['infrastructure']
            participantValue = data['participantValue']
            requestDate = data['requestDate']

            new_course = modelCourse(sense, instruction, activityType, activityName, attendence, minCalification, minHours, participantsNumber, targetPopulation, generalObjectives, totalHours, teachingTechnique, evaluation, infrastructure, participantValue, requestDate)

            db.session.add(new_course)

            db.session.commit()

            return {"message": "Curso guardado con exito :)."}
        except Exception as e:
            print(e)
            return {"message": "Error al ingresar un curso."}, 500
     
     
    def get(self):
        try: 
            course = modelCourse.query.all()
            return jsonify(modelCourse.serialize_list(course))
        except Exception as e:
            print(e)
            return {"message": "Error al obtener los cursos."}, 500