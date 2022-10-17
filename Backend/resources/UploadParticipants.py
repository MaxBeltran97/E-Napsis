import json
from flask import Flask, request, jsonify
from flask_restful import Resource, reqparse
from sqlalchemy import create_engine
from database.db import db
import argparse
import werkzeug
import pandas as pd
from database.config import DevelopmentConfig
from models.participant import Participant


class UploadParticipants(Resource):

    parser = reqparse.RequestParser()

    parser.add_argument('courseCode',
        type=str,
        location="form",
        required=True,
        help="Debe ingresar el código del curso"
    )
    parser.add_argument('company_id',
        type=int,
        location= "form",
        required=False,
        help="Debe ingresar la el id de la compañia"
    )
    parser.add_argument('excel',
         type=werkzeug.datastructures.FileStorage,
         location="files",
         required=False,
         help = "Ingreasa el archivo"
    )

    def post(self):
        data = UploadParticipants.parser.parse_args()
        try:
            courseCode = data['courseCode']
            company_id = data['company_id']
            excel = data['excel']

            df  = pd.read_excel(excel)
            cabecera = ['rut','fullName','lastName','motherLastName', 'institution', 'email', 'gender', 'position','nationalityType']
            df.columns = cabecera
            df = df.assign(participantType = "empresa")
            df = df.assign(courseCode = courseCode)
            df = df.assign(company_id = company_id)
            df.insert(0, '_id', range(0, 0 + len(df)))
            #df = df.reset_index()
            #df = df.assign(_id = 0)
            #ARREGLAR
            engine = create_engine(DevelopmentConfig.SQLALCHEMY_DATABASE_URI)
            df.to_sql("participant", con=engine, if_exists="replace", index=False)
            
            print(df)
            
            
        except Exception as e:
            print (e)
            return {"message": "Error al ingresar archivo."}, 500