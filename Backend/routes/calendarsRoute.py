import flask
import os
from flask import request, Flask
from strgen import StringGenerator
from models.calendarCourseEvaluation import *
from models.calendarCourseAttendance import *
from models.calendarCourseUploadFile import *
from models.calendarCourse import *
from models.participant import *
from models.teller import *
from models.courseTeller import *


app = Flask(__name__)

UPLOAD_FOLDER = 'assets/calendarFiles'
UPLOAD_FOLDER_EVALUATION = 'assets/excelEvaluation'
UPLOAD_FOLDER_ATTENDANCE = 'assets/excelAttendance'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['UPLOAD_FOLDER_EVALUATION'] = UPLOAD_FOLDER_EVALUATION
app.config['UPLOAD_FOLDER_ATTENDANCE'] = UPLOAD_FOLDER_ATTENDANCE

calendars = flask.Blueprint('calendars', __name__)



@calendars.route('/api/calendar', methods=['POST'])
def add_calendar():
    try:
        internalCode = request.json['internalCode']
        internalName = request.json['internalName']
        course_id = request.json['course_id']
        instruction = request.json['instruction']
        courseTotalHours = request.json['courseTotalHours']
        ejecutionPlace = request.json['ejecutionPlace']
        ejecutionCity = request.json['ejecutionCity']
        ejecutionRegion = request.json['ejecutionRegion']
        startDate = request.json['startDate']
        endDate = request.json['endDate']
        participantValue = request.json['participantValue']
        logo_id = request.json['logo_id']

        new_calendarCourse = CalendarCourse(internalCode, internalName, course_id, instruction, courseTotalHours,
                                                 ejecutionPlace, ejecutionCity, ejecutionRegion, startDate, endDate, participantValue, logo_id)

        db.session.add(new_calendarCourse)
        db.session.commit()

        return {
            "ok": True,
            "calendarCourse": new_calendarCourse.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al calendarizar un curso"
        }, 500
    finally:
        db.session.close()

@calendars.route('/api/calendar', methods=['GET'])
def get_calendars():
    try:
        all_calendarCourses = CalendarCourse.query.all()
        result = calendar_course_schemas.dump(all_calendarCourses)

        return {
            "ok": True,
            "calendarCourses": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener cursos calendarizados"
        }, 500

@calendars.route('/api/calendar/<_id>', methods=['GET'])
def get_calendar(_id):
    try:
        calendarCourse = CalendarCourse.query.get(_id)


        return {
            "ok": True,
            "calendarCourse": calendarCourse.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el curso calendarizado"
        }, 500

# --- nuevo cambio
@calendars.route('/api/calendar/class_book', methods=['GET'])
def get_class_books():
    try:
        data_final = []

        all_calendarCourses = CalendarCourse.query.all()
        result = calendar_course_schemas.dump(all_calendarCourses)
        for item in result:
            courseParticipants = Participant.query.filter_by(
                calendarCourse_id=item.get('_id'))

            if (courseParticipants.count() >= 1):
                courseEvaluationDB = CalendarCourseEvaluation.query.filter_by(
                    calendarCourse_id=item.get('_id'))
                courseEvaluationList = calendarCourseEvaluations_schemas.dump(
                    courseEvaluationDB)
                item["evaluationDates"] = courseEvaluationList
                data_final.append(item)

        return {
            "ok": True,
            "calendarCourses": calendar_course_schemas.dump(data_final)
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el Libro de Clases"
        }, 500

@calendars.route('/api/calendar/class_book/<_userTellerId>', methods=['GET'])
def get_class_books_teller(_userTellerId):
    try:
        data_final = []

        teller = Teller.query.filter_by(user_id=_userTellerId).first()
        all_CourseTeller = CourseTeller.query.filter_by(teller_id=teller._id)
        for courseTeller in all_CourseTeller:
            all_calendarCourses = CalendarCourse.query.filter_by(course_id=courseTeller.course_id)
            result = calendar_course_schemas.dump(all_calendarCourses)
            for calendarCourse in result:
                courseParticipants = Participant.query.filter_by(
                    calendarCourse_id=calendarCourse.get('_id'))

                if (courseParticipants.count() >= 1):
                    courseEvaluationDB = CalendarCourseEvaluation.query.filter_by(
                        calendarCourse_id=calendarCourse.get('_id'))
                    courseEvaluationList = calendarCourseEvaluations_schemas.dump(
                        courseEvaluationDB)
                    calendarCourse["evaluationDates"] = courseEvaluationList
                    data_final.append(calendarCourse)
        
        return {
            "ok": True,
            "calendarCourses": calendar_course_schemas.dump(data_final)
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el Libro de Clases"
        }, 500
# --- fin nuevo cambio

@calendars.route('/api/calendar/<_id>', methods=['PUT'])
def update_calendar(_id):
    try:
        calendarCourse = CalendarCourse.query.get(_id)

        internalCode = request.json['internalCode']
        internalName = request.json['internalName']
        course_id = request.json['course_id']
        instruction = request.json['instruction']
        courseTotalHours = request.json['courseTotalHours']
        ejecutionPlace = request.json['ejecutionPlace']
        ejecutionCity = request.json['ejecutionCity']
        ejecutionRegion = request.json['ejecutionRegion']
        startDate = request.json['startDate']
        endDate = request.json['endDate']
        participantValue = request.json['participantValue']
        logo_id = request.json['logo_id']

        calendarCourse.internalCode = internalCode
        calendarCourse.internalName = internalName
        calendarCourse.course_id = course_id
        calendarCourse.instruction = instruction
        calendarCourse.courseTotalHours = courseTotalHours
        calendarCourse.ejecutionPlace = ejecutionPlace
        calendarCourse.ejecutionCity = ejecutionCity
        calendarCourse.ejecutionRegion = ejecutionRegion
        calendarCourse.startDate = startDate
        calendarCourse.endDate = endDate
        calendarCourse.participantValue = participantValue
        calendarCourse.logo_id = logo_id

        db.session.commit()


        return {
            "ok": True,
            "calendarCourse": calendarCourse.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el curso calendarizado"
        }, 500

# --- nuevo cambio ---
@calendars.route('/api/calendar/<_id>', methods=['DELETE'])
def delete_calendar(_id):
    try:
        calendarCourse = CalendarCourse.query.get(_id)
        evaluations = CalendarCourseEvaluation.query.filter_by(calendarCourse_id = _id)
        attendances = CalendarCourseAttendance.query.filter_by(calendarCourse_id = _id)
        files = CalendarCourseUploadFile.query.filter_by(calendarCourse_id = _id)
        participants = Participant.query.filter_by(calendarCourse_id = _id)
        excelPath = ''
        for participant in participants:
            participant.calendarCourse_id = None
            db.session.commit()

        for evaluation in evaluations:
            excelPath = evaluation.excelPath
            db.session.delete(evaluation)
            db.session.commit()

        evaluationPath = os.path.join(
                app.config["UPLOAD_FOLDER_EVALUATION"],excelPath
            )
        os.remove(evaluationPath)

        for attendance in attendances:
            excelPath = attendance.excelPath
            db.session.delete(attendance)
            db.session.commit()

        attendancePath = os.path.join(
                app.config["UPLOAD_FOLDER_ATTENDANCE"],excelPath
        )
        os.remove(attendancePath)

        for fileCourse in files:
            db.session.delete(fileCourse)
            db.session.commit()
            # eliminar el archivo que esta guardado en la carpeta

        db.session.delete(calendarCourse)
        db.session.commit()
        return {
            "ok": True,
            "calendarCourse": calendarCourse.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el curso calendarizado"
        }, 500
# --- fin nuevo cambio ---

@calendars.route('/api/calendar/uploadfile', methods=['POST'])
def upload_file_calendar():
    try:
        file = request.files["uploadFile"]
        calendarCourse_id = request.form["calendarCourse_id"]
        name = request.form["name"]

        filesplit = file.filename.split('.')
        extension = filesplit[len(filesplit)-1]

        flag = True
        while (flag):
            try:
                randomName = StringGenerator(
                    "[\l\d]{20}").render_list(1, unique=True)[0]
                nuevoNombreFile = calendarCourse_id + randomName + "." + extension
                new_calendarCourseUpload = CalendarCourseUploadFile(
                    calendarCourse_id, name, nuevoNombreFile)
                db.session.add(new_calendarCourseUpload)
                db.session.commit()
                file.save(os.path.join(
                    app.config["UPLOAD_FOLDER"], nuevoNombreFile))
                flag = False
            except Exception as e:
                db.session.rollback()
            finally:
                db.session.close()

        return {
            "ok": True,
            "msg": "Archivo Subido"
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al subir un archivo"
        }, 500

