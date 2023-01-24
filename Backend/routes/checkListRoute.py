import flask
from flask import request
from models.checkList import *
from models.checkListActivity import *
from models.checkListActivity import *



checklist = flask.Blueprint('checklist', __name__)

@checklist.route('/api/check_list', methods=['POST'])
def add_checklist():
    try:
        calendarCourse_id = request.json['calendarCourse_id']
        new_checkList = CheckList(calendarCourse_id)

        db.session.add(new_checkList)
        db.session.commit()


        checkListActivities = request.json['checkListActivities']
        for item in checkListActivities:
            try:
                new_checkListActivity = CheckListActivity(
                    new_checkList._id, item['order'], item['activity'], 
                        item['status'], item['date'], item['roleActivity'])
                
                db.session.add(new_checkListActivity)
                db.session.commit()
            except Exception as e:
                print(e)

        checkListDB = CheckListActivity.query.filter_by(
            checkList_id= new_checkList._id)

        checkListSerialized = new_checkList.serialize()
        checkListActivitiesList = check_list_activity_schema.dump(checkListDB)
        checkListSerialized['checkListActivities'] = checkListActivitiesList

        return {
            "ok": True,
            "checkList": checkListSerialized
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al añadir checklist"
        }, 500
    finally:
        db.session.close()
        
@checklist.route('/api/check_list', methods=['GET'])
def get_checklists():
    try:
        all_checklist = CheckList.query.all()
        result = check_list_schema.dump(all_checklist)
       

        for item in result:
            checkListActivity = CheckListActivity.query.filter_by(
                    checkList_id=item.get('_id'))
            checkListActivityList = check_list_activity_schema.dump(checkListActivity)
            item['checkListActivities'] = checkListActivityList

        return {
            "ok": True,
            "checkList": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los checkList"
        }, 500

@checklist.route('/api/check_list/<_id>', methods=['GET'])
def get_checklist(_id):
    
    try:
        checklist = CheckList.query.get(_id)
        checklistDB = CheckListActivity.query.filter_by(checkList_id = checklist._id)

        checklistSerialized = checklist.serialize()
        checklistactivitiesList = check_list_activity_schema.dump(checklistDB)
        checklistSerialized['checkListActivities'] = checklistactivitiesList
        
        # for item in result:
        #     checkListActivity = CheckListActivity.query.filter_by(
        #             checkList_id=item.get('_id'))
        #     checkListActivityList = check_list_activity_schema.dump(checkListActivity)
        #     item['checkListActivities'] = checkListActivityList
        
        return {
            "ok": True,
            "checkList": checklistSerialized
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el checklist"
        }, 500
        