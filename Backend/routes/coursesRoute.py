import flask
from flask import request
from models.course import *
from models.courseActvityContentHours import *
from models.courseEquipment import *
from models.courseParticipantMaterial import *
from models.courseTeller import *
from models.courseTellerSupport import *
from models.calendarCourse import *
from routes.calendarsRoute import delete_calendar




courses = flask.Blueprint('courses', __name__)

# Agregar los datos al curso enviado


@courses.route('/api/course', methods=['POST'])
def add_courses():
    try:
        sence = request.json['sence']
        instruction = request.json['instruction']
        activityType = request.json['activityType']
        activityName = request.json['activityName']
        attendance = request.json['attendance']
        minCalification = request.json['minCalification']
        minHours = request.json['minHours']
        participantsNumber = request.json['participantsNumber']
        targetPopulation = request.json['targetPopulation']
        generalObjectives = request.json['generalObjectives']
        totalHours = request.json['totalHours']
        teachingTechnique = request.json['teachingTechnique']
        evaluation = request.json['evaluation']
        infrastructure = request.json['infrastructure']
        participantValue = request.json['participantValue']
        requestDate = request.json['requestDate']

        new_course = Course(sence, instruction, activityType, activityName, attendance, minCalification, minHours, participantsNumber,
                                 targetPopulation, generalObjectives, totalHours, teachingTechnique, evaluation, infrastructure, participantValue, requestDate)

        db.session.add(new_course)
        db.session.commit()

        # Obtener datos para las otras tablas
        activitiesContentHours = request.json['activitiesContentHours']
        for item in activitiesContentHours:
            try:
                new_courseActivityContentHours = CourseActivityContentHours(
                    new_course._id, item['activity'], item['content'], item['theoreticalHour'], item['practiceHour'], item['eLearningHour'])

                db.session.add(new_courseActivityContentHours)
                db.session.commit()
            except Exception as e:
                print(e)

        tellers_id = request.json['tellers_id']
        for item in tellers_id:
            try:
                new_courseTeller = CourseTeller(
                    new_course._id, item['teller_id'])

                db.session.add(new_courseTeller)
                db.session.commit()
            except Exception as e:
                print(e)

        tellerSupport = request.json['tellerSupport']
        for item in tellerSupport:
            try:
                new_courseTellerSupport = CourseTellerSupport(
                    new_course._id, item['description'], item['amount'])

                db.session.add(new_courseTellerSupport)
                db.session.commit()
            except Exception as e:
                print(e)

        participantMaterial = request.json['participantMaterial']
        for item in participantMaterial:
            try:
                new_courseParticipantMaterial = CourseParticipantMaterial(
                    new_course._id, item['description'], item['amount'])

                db.session.add(new_courseParticipantMaterial)
                db.session.commit()
            except Exception as e:
                print(e)

        equipment = request.json['equipment']
        for item in equipment:
            try:
                new_courseEquipment = CourseEquipment(
                    new_course._id, item['description'], item['amount'])

                db.session.add(new_courseEquipment)
                db.session.commit()
            except Exception as e:
                print(e)

        courseSerialized = new_course.serialize()
        CourseActivityContentHoursDB = CourseActivityContentHours.query.filter_by(
            course_id=new_course._id)
        courseActivityContentHourList = course_course_activity_content_hours_schemas.dump(
            CourseActivityContentHoursDB)
        courseSerialized['activitiesContentHours'] = courseActivityContentHourList

        CourseEquipmentDB = CourseEquipment.query.filter_by(
            course_id=new_course._id)
        CourseEquipmentList = course_equipment_schemas.dump(CourseEquipmentDB)
        courseSerialized['equipment'] = CourseEquipmentList

        CourseParticipantMaterialDB = CourseParticipantMaterial.query.filter_by(
            course_id=new_course._id)
        CourseParticipantMaterialList = course_participant_material_schemas.dump(
            CourseParticipantMaterialDB)
        courseSerialized['participantMaterial'] = CourseParticipantMaterialList

        CourseTellerDB = CourseTeller.query.filter_by(
            course_id=new_course._id)
        CourseTellerList = course_teller_schemas.dump(CourseTellerDB)
        courseSerialized['tellers_id'] = CourseTellerList

        CourseTellerSupportDB = CourseTellerSupport.query.filter_by(
            course_id=new_course._id)
        CourseTellerSupportList = course_teller_support_schemas.dump(
            CourseTellerSupportDB)
        courseSerialized['tellerSupport'] = CourseTellerSupportList

        return {
            "ok": True,
            "course": courseSerialized
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al agregar el curso"
        }, 500
    finally:
        db.session.close()

# Agregar los datos a cada curso


@courses.route('/api/course', methods=['GET'])
def get_courses():
    try:
        all_courses = Course.query.all()
        result = courses_schema.dump(all_courses)
        for item in result:
            CourseActivityContentHoursDB = CourseActivityContentHours.query.filter_by(
                course_id=item.get('_id'))
            courseActivityContentHourList = course_course_activity_content_hours_schemas.dump(
                CourseActivityContentHoursDB)
            item['activitiesContentHours'] = courseActivityContentHourList

            CourseEquipmentDB = CourseEquipment.query.filter_by(
                course_id=item.get('_id'))
            CourseEquipmentList = course_equipment_schemas.dump(
                CourseEquipmentDB)
            item['equipment'] = CourseEquipmentList

            CourseParticipantMaterialDB = CourseParticipantMaterial.query.filter_by(
                course_id=item.get('_id'))
            CourseParticipantMaterialList = course_participant_material_schemas.dump(
                CourseParticipantMaterialDB)
            item['participantMaterial'] = CourseParticipantMaterialList

            CourseTellerDB = CourseTeller.query.filter_by(
                course_id=item.get('_id'))
            CourseTellerList = course_teller_schemas.dump(CourseTellerDB)
            item['tellers_id'] = CourseTellerList

            CourseTellerSupportDB = CourseTellerSupport.query.filter_by(
                course_id=item.get('_id'))
            CourseTellerSupportList = course_teller_support_schemas.dump(
                CourseTellerSupportDB)
            item['tellerSupport'] = CourseTellerSupportList

        return {
            "ok": True,
            "courses": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los cursos"
        }, 500

# Agregar los datos al curso enviado

@courses.route('/api/course/<_id>', methods=['GET'])
def get_course(_id):
    try:
        course = Course.query.get(_id)
        courseSerialized = course.serialize()
        CourseActivityContentHoursDB = CourseActivityContentHours.query.filter_by(
            course_id=course._id)
        courseActivityContentHourList = course_course_activity_content_hours_schemas.dump(
            CourseActivityContentHoursDB)
        courseSerialized['activitiesContentHours'] = courseActivityContentHourList

        CourseEquipmentDB = CourseEquipment.query.filter_by(
            course_id=course._id)
        CourseEquipmentList = course_equipment_schemas.dump(CourseEquipmentDB)
        courseSerialized['equipment'] = CourseEquipmentList

        CourseParticipantMaterialDB = CourseParticipantMaterial.query.filter_by(
            course_id=course._id)
        CourseParticipantMaterialList = course_participant_material_schemas.dump(
            CourseParticipantMaterialDB)
        courseSerialized['participantMaterial'] = CourseParticipantMaterialList

        CourseTellerDB = CourseTeller.query.filter_by(
            course_id=course._id)
        CourseTellerList = course_teller_schemas.dump(CourseTellerDB)
        courseSerialized['tellers_id'] = CourseTellerList

        CourseTellerSupportDB = CourseTellerSupport.query.filter_by(
            course_id=course._id)
        CourseTellerSupportList = course_teller_support_schemas.dump(
            CourseTellerSupportDB)
        courseSerialized['tellerSupport'] = CourseTellerSupportList

        return {
            "ok": True,
            "course": courseSerialized
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el curso"
        }, 500

# Actualizar las tablas adyacentes eliminando actualizando y agregando
# Agregar los datos al curso enviado


@courses.route('/api/course/<_id>', methods=['PUT'])
def update_course(_id):
    try:
        course = Course.query.get(_id)

        sence = request.json['sence']
        instruction = request.json['instruction']
        activityType = request.json['activityType']
        activityName = request.json['activityName']
        attendance = request.json['attendance']
        minCalification = request.json['minCalification']
        minHours = request.json['minHours']
        participantsNumber = request.json['participantsNumber']
        targetPopulation = request.json['targetPopulation']
        generalObjectives = request.json['generalObjectives']
        totalHours = request.json['totalHours']
        teachingTechnique = request.json['teachingTechnique']
        evaluation = request.json['evaluation']
        infrastructure = request.json['infrastructure']
        participantValue = request.json['participantValue']
        requestDate = request.json['requestDate']

        course.sence = sence
        course.instruction = instruction
        course.activityType = activityType
        course.activityName = activityName
        course.attendance = attendance
        course.minCalification = minCalification
        course.minHours = minHours
        course.participantsNumber = participantsNumber
        course.targetPopulation = targetPopulation
        course.generalObjectives = generalObjectives
        course.totalHours = totalHours
        course.teachingTechnique = teachingTechnique
        course.evaluation = evaluation
        course.infrastructure = infrastructure
        course.participantValue = participantValue
        course.requestDate = requestDate

        db.session.commit()

# ----------------------------ACTUALIZACIÓN DE LAS ACTIVIDADES
#
        activitiesContentHours = request.json['activitiesContentHours']
        activitiesContentHoursDB = CourseActivityContentHours.query.filter_by(
            course_id=course._id)

        # Si existe se actualiza, sino, se elimina

        for itemDB in activitiesContentHoursDB:
            flag = False
            for item in activitiesContentHours:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    itemDB.activity = item['activity']
                    itemDB.content = item['content']
                    itemDB.theoreticalHour = item['theoreticalHour']
                    itemDB.practiceHour = item['practiceHour']
                    itemDB.eLearningHour = item['eLearningHour']
                    db.session.commit()
                    break
            if (flag == False):
                db.session.delete(itemDB)
                db.session.commit()

        # Los nuevos que no poseen id se agregan
        for item in activitiesContentHours:

            if (item.get('_id') == None):
                try:
                    new_courseActivityContentHours = CourseActivityContentHours(
                        course._id, item['activity'], item['content'], item['theoreticalHour'], item['practiceHour'], item['eLearningHour'])

                    db.session.add(new_courseActivityContentHours)
                    db.session.commit()
                except Exception as e:
                    print(e)

# ----------------------------ACTUALIZACIÓN DE LOS TELLERS

        tellers_id = request.json['tellers_id']
        tellers_idDB = CourseTeller.query.filter_by(
            course_id=course._id)

        for itemDB in tellers_idDB:
            flag = False
            for item in tellers_id:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    break
            if flag == False:
                db.session.delete(itemDB)
                db.session.commit()

        for item in tellers_id:

            if (item.get('_id') == None):
                try:
                    new_courseTeller = CourseTeller(
                        course._id, item['teller_id'])

                    db.session.add(new_courseTeller)
                    db.session.commit()
                except Exception as e:
                    print(e)

# ----------------------------ACTUALIZACIÓN DE LOS TELLERS SUPPORT

        tellerSupport = request.json['tellerSupport']
        tellerSupportDB = CourseTellerSupport.query.filter_by(
            course_id=course._id)

        for itemDB in tellerSupportDB:
            flag = False
            for item in tellerSupport:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    itemDB.description = item['description']
                    itemDB.amount = item['amount']
                    db.session.commit()
                    break
            if (flag == False):
                db.session.delete(itemDB)
                db.session.commit()

        for item in tellerSupport:

            if (item.get('_id') == None):
                try:
                    new_courseTellerSupport = CourseTellerSupport(
                        course._id, item['description'], item['amount'])

                    db.session.add(new_courseTellerSupport)
                    db.session.commit()
                except Exception as e:
                    print(e)

# ----------------------------ACTUALIZACIÓN DEl MATERIAL DEL PARTICIPANTE

        participantMaterial = request.json['participantMaterial']
        participanteMaterialDB = CourseParticipantMaterial.query.filter_by(
            course_id=course._id)

        for itemDB in participanteMaterialDB:
            flag = False
            for item in participantMaterial:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    itemDB.description = item['description']
                    itemDB.amount = item['amount']
                    db.session.commit()
                    break
            if (flag == False):
                db.session.delete(itemDB)
                db.session.commit()

        for item in participantMaterial:

            if (item.get('_id') == None):
                try:
                    new_courseParticipantMaterial = CourseParticipantMaterial(
                        course._id, item['description'], item['amount'])

                    db.session.add(new_courseParticipantMaterial)
                    db.session.commit()
                except Exception as e:
                    print(e)

# ----------------------------ACTUALIZACIÓN DEl EQUIPAMIENTO

        equipment = request.json['equipment']
        equipmentDB = CourseEquipment.query.filter_by(
            course_id=course._id)

        for itemDB in equipmentDB:
            flag = False
            for item in equipment:
                if (itemDB._id == item.get('_id')):
                    flag = True
                    itemDB.description = item['description']
                    itemDB.amount = item['amount']
                    db.session.commit()
                    break
            if flag == False:
                db.session.delete(itemDB)
                db.session.commit()

        for item in equipment:

            if (item.get('_id') == None):
                try:
                    new_courseEquipment = CourseEquipment(
                        course._id, item['description'], item['amount'])

                    db.session.add(new_courseEquipment)
                    db.session.commit()
                except Exception as e:
                    print(e)

# -----------------------------------------------------------
        courseSerialized = course.serialize()
        CourseActivityContentHoursDB = CourseActivityContentHours.query.filter_by(
            course_id=course._id)
        courseActivityContentHourList = course_course_activity_content_hours_schemas.dump(
            CourseActivityContentHoursDB)
        courseSerialized['activitiesContentHours'] = courseActivityContentHourList

        CourseEquipmentDB = CourseEquipment.query.filter_by(
            course_id=course._id)
        CourseEquipmentList = course_equipment_schemas.dump(CourseEquipmentDB)
        courseSerialized['equipment'] = CourseEquipmentList

        CourseParticipantMaterialDB = CourseParticipantMaterial.query.filter_by(
            course_id=course._id)
        CourseParticipantMaterialList = course_participant_material_schemas.dump(
            CourseParticipantMaterialDB)
        courseSerialized['participantMaterial'] = CourseParticipantMaterialList

        CourseTellerDB = CourseTeller.query.filter_by(
            course_id=course._id)
        CourseTellerList = course_teller_schemas.dump(CourseTellerDB)
        courseSerialized['tellers_id'] = CourseTellerList

        CourseTellerSupportDB = CourseTellerSupport.query.filter_by(
            course_id=course._id)
        CourseTellerSupportList = course_teller_support_schemas.dump(
            CourseTellerSupportDB)
        courseSerialized['tellerSupport'] = CourseTellerSupportList

        return {
            "ok": True,
            "course": courseSerialized
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el curso"
        }, 500
    finally:
        db.session.close()

# Eliminar las tablas adyacentes al eliminar el curso

# --- nuevo cambio ---
@courses.route('/api/course/<_id>', methods=['DELETE'])
def delete_course(_id):
    try:
        # Curso
        course = Course.query.get(_id)
        activitiesContentHours = CourseActivityContentHours.query.filter_by(course_id = _id)
        equipment = CourseEquipment.query.filter_by(course_id = _id)
        participantMaterial = CourseParticipantMaterial.query.filter_by(course_id = _id)
        tellers_id = CourseTeller.query.filter_by(course_id = _id)
        tellerSupport = CourseTellerSupport.query.filter_by(course_id = _id)
        
        # Curso calendarizado
        coursesCalendar = CalendarCourse.query.filter_by(course_id = _id)

        for item in coursesCalendar:
            delete_calendar(item._id)

        # Elimina las tablas externas del curso
        for item in activitiesContentHours:
            db.session.delete(item)
            db.session.commit()
        
        for item in equipment:
            db.session.delete(item)
            db.session.commit()

        for item in participantMaterial:
            db.session.delete(item)
            db.session.commit()

        for item in tellers_id:
            db.session.delete(item)
            db.session.commit()

        for item in tellerSupport:
            db.session.delete(item)
            db.session.commit()

        # Finalizando elimina el curso
        db.session.delete(course)
        db.session.commit()
        return {
            "ok": True,
            "course": course.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el curso"
        }, 500
    finally:
        db.session.close()
# --- fin nuevo cambio ---
