import flask
from flask import request
from models.automaticNotices import *
from models.automaticNoticesEmail import *





automaticNotice = flask.Blueprint('automaticNotice', __name__)



@automaticNotice.route('/api/automatic_notices', methods=['GET'])
def get_notices():
    try:
        all_notices = AutomaticNotices.query.all()
        result = automatic_notices_schema.dump(all_notices)
        
        for item in result:
            automaticNoticesDB = AutomaticNoticesEmail.query.filter_by(
                notice_id=item.get('_id'))
            automaticNoticesList = automatic_notices_emails_schema.dump(automaticNoticesDB)
            item["emails"] = automaticNoticesList

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


@automaticNotice.route('/api/automatic_notice/email/<notice_id>', methods=['GET'])
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


@automaticNotice.route('/api/automatic_notices', methods=['PUT'])
def update_notices():

    try:
        automaticnotices = request.json['automatic_notices']

        for notice in automaticnotices:
            automaticnotice = AutomaticNotices.query.get(notice['_id'])
            automaticnotice.days = notice['days']
            emails = AutomaticNoticesEmail.query.filter_by(notice_id = notice['_id'])
            db.session.commit()

            for i in emails:
                email = AutomaticNoticesEmail.query.get(i._id)
                db.session.delete(email)
                db.session.commit()

            for i in notice['emails']:
                new_email = AutomaticNoticesEmail(i['email'], notice['_id'])
                db.session.add(new_email)
                db.session.commit()

        return {
            "ok": True
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los avisos"
        }, 500
    finally:
        db.session.close()