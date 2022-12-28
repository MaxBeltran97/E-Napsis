import flask
from flask import request
from models.holiday import *



holidays = flask.Blueprint('holiday', __name__)



@holidays.route('/api/calendar/holiday', methods=['POST'])
def add_holiday():

    try:
        name = request.json['name']
        date = request.json['date']

        new_holiday = Holiday(name, date)

        db.session.add(new_holiday)
        db.session.commit()
        return {
            "ok": True,
            "holiday": new_holiday.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar festivo"
        }, 500
    finally:
        db.session.close()


@holidays.route('/api/calendar/holiday', methods=['GET'])
def get_holidays():
    try:
        all_holidays = Holiday.query.all()
        result = holidays_schema.dump(all_holidays)
        return {
            "ok": True,
            "holidays": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los festivos"
        }, 500


@holidays.route('/api/calendar/holiday/<_id>', methods=['GET'])
def get_holiday(_id):

    try:
        holiday = Holiday.query.get(_id)
        return {
            "ok": True,
            "holiday": holiday.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el festivo"
        }, 500


@holidays.route('/api/calendar/holiday/<_id>', methods=['PUT'])
def update_holiday(_id):
    try:

        holiday = Holiday.query.get(_id)

        name = request.json['name']
        date = request.json['date']

        holiday.name = name
        holiday.date = date

        db.session.commit()
        return {
            "ok": True,
            "holiday": holiday.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el festivo"
        }, 500
    finally:
        db.session.close()


@holidays.route('/api/calendar/holiday/<_id>', methods=['DELETE'])
def delete_holiday(_id):
    try:
        holiday = Holiday.query.get(_id)

        db.session.delete(holiday)
        db.session.commit()
        return {
            "ok": True,
            "holiday": holiday.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el festivo"
        }, 500
    finally:
        db.session.close()