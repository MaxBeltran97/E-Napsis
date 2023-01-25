import flask
from flask import request, Flask
from models.calendarCourseEvaluation import *
from models.participant import *
import pandas as pd
import openpyxl



evaluation = flask.Blueprint('evaluation', __name__)


@evaluation.route('/api/calendar/evaluation', methods=['POST'])
def add_evaluation():
    try:

        participants_id = []

        evaluationDate = request.json['evaluationDate']
        percentage = request.json['percentage']
        title = request.json['title']
        calendar_id = request.json['calendarCourse_id']

        new_evaluation = CalendarCourseEvaluation(calendar_id, evaluationDate, percentage, title, '-')

        evaluation_id = CalendarCourseEvaluation.query.filter_by(calendarCourse_id = calendar_id)
       
        
        if(bool(evaluation_id.first()) == False):
            participants = Participant.query.filter_by(calendarCourse_id = calendar_id)
            print('pichulaaaaaaaaaaaaaaaaaaaaa')
            wb = openpyxl.Workbook()
            ws = wb.active
            cont = 2
            for i in participants:
                #participants_id.append(i._id)
                ws[f'A{cont}'] = i._id
                cont += 1


            db.session.add(new_evaluation)
            db.session.commit()
            
            ws['B1'] = new_evaluation._id
            wb.save('Evaluacion.xlsx')
            
        return {
                "ok": True
            }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al calendarizar un curso"
        }, 500
    finally:
        db.session.close()
