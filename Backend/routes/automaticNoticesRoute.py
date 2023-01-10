import flask
from flask import request
from models.automaticNotices import *
from models.automaticNoticesEmail import *





automaticNotice = flask.Blueprint('automaticNotice', __name__)



@automaticNotice.route('/api/automaticNotice', methods=['GET'])
def get_notices():

    try:
        all_notices = AutomaticNotices.query.all()
        result = automatic_notices_schema.dump(all_notices)
        
        # for item in result:
        #     automaticNoticesDB = AutomaticNoticesEmail.query.filter_by(
        #         notice_id=item.get('_id'))
        #     automaticNoticesList = automatic_notices_emails_schema.dump(automaticNoticesDB)
        #     item["email"] = automaticNoticesList

        return {
            "ok": True,
            "notices": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los avisos automáticos"
        }, 500


@automaticNotice.route('/api/automaticNotice/email/<notice_id>', methods=['GET'])
def get_email(notice_id):

    try:
        
        result = []
        emails = AutomaticNoticesEmail.query.filter_by(notice_id=notice_id)
        emailList = automatic_notices_schema.dump(emails)


        for i in emailList:
            email = AutomaticNoticesEmail.query.get(i['_id'])
            result.append(email.serialize())


        return {
            "ok": True,
            "emails": result
        }, 200
    except Exception as e:
        return {
            "ok": False,
            "msg": "Error al obtener los emails"
        }, 500