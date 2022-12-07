import flask
from flask import request
from models.company import *
from models.participant import *




companies = flask.Blueprint('companies', __name__)


@companies.route('/api/company', methods=['POST'])
def add_company():
    try:
        rut = request.json['rut']
        socialReason = request.json['socialReason']
        fantasyName = request.json['fantasyName']
        giro = request.json['giro']
        address = request.json['address']
        region = request.json['region']
        commune = request.json['commune']
        city = request.json['city']
        contactName = request.json['contactName']
        cellPhone = request.json['cellPhone']
        position = request.json['position']
        email = request.json['email']

        new_company = Company(rut, socialReason, fantasyName, giro, address,
                                   region, commune, city, contactName, cellPhone, position, email)

        db.session.add(new_company)
        db.session.commit()
        return {
            "ok": True,
            "company": new_company.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar la compañia"
        }, 500
    finally:
        db.session.close()


@companies.route('/api/company', methods=['GET'])
def get_companys():
    try:
        all_companys = Company.query.all()
        result = companys_schema.dump(all_companys)
        return {
            "ok": True,
            "companies": result
        }, 200
    except Exception as e:
        return {
            "ok": False,
            "msg": "Error al obtener las compañias"
        }, 500


@companies.route('/api/company/<_id>', methods=['GET'])
def get_company(_id):
    try:
        company = Company.query.get(_id)
        return {
            "ok": True,
            "company": company.serialize()
        }, 200
    except Exception as e:
        return {
            "ok": False,
            "msg": "Error al obtener la compañia"
        }, 500


@companies.route('/api/company/<_id>', methods=['PUT'])
def update_company(_id):
    try:
        company = Company.query.get(_id)

        rut = request.json['rut']
        socialReason = request.json['socialReason']
        fantasyName = request.json['fantasyName']
        giro = request.json['giro']
        address = request.json['address']
        region = request.json['region']
        commune = request.json['commune']
        city = request.json['city']
        contactName = request.json['contactName']
        cellPhone = request.json['cellPhone']
        position = request.json['position']
        email = request.json['email']

        company.rut = rut
        company.socialReason = socialReason
        company.fantasyName = fantasyName
        company.giro = giro
        company.address = address
        company.region = region
        company.commune = commune
        company.city = city
        company.contactName = contactName
        company.cellPhone = cellPhone
        company.position = position
        company.email = email

        db.session.commit()
        return {
            "ok": True,
            "company": company.serialize()
        }, 200
    except Exception as e:
        return {
            "ok": False,
            "msg": "Error al actualizar la compañia"
        }, 500
    finally:
        db.session.close()

# --- nuevo cambio ---
@companies.route('/api/company/<_id>', methods=['DELETE'])
def delete_company(_id):
    try:
        company = Company.query.get(_id)
        participants_company = Participant.query.filter_by(company_id = _id)

        for participant in participants_company:
            db.session.delete(participant)
            db.session.commit()
        
        db.session.delete(company)
        db.session.commit()
        return {
            "ok": True,
            "company": company.serialize()
        }, 200
    except Exception as e:
        return {
            "ok": False,
            "msg": "Error al eliminar la compañia"
        }, 500
    finally:
        db.session.close()
# --- fin nuevo cambio ---
