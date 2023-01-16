import flask
from flask import request
from models.companyData import *


companyData = flask.Blueprint('companyData', __name__)


@companyData.route('/api/company_data', methods=['GET'])
def get_company_data():
    try:
        all_company_data = CompanyData.query.all()
        result = companys_data_schema.dump(all_company_data)
        return {
            "ok": True,
            "companyData": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los datos de la compañia"
        }, 500

@companyData.route('/api/company_data/<_id>', methods=['PUT'])
def update_company_data(_id):
    try:

        company_data = CompanyData.query.get(_id)

        presentation = request.json['presentation']
        legalRepresentativeName = request.json['legalRepresentativeName']
        legalRepresentativeRut = request.json['legalRepresentativeRut']
        address = request.json['address']
        city = request.json['city']
        region = request.json['region']
        phone = request.json['phone']
        facebook = request.json['facebook']
        twitter = request.json['twitter']
        linkedin = request.json['linkedin']
        sloganLine1 = request.json['sloganLine1']
        sloganLine2 = request.json['sloganLine2']
        headerBadge = request.json['headerBadge']


        company_data.presentation = presentation
        company_data.legalRepresentativeName = legalRepresentativeName
        company_data.legalRepresentativeRut = legalRepresentativeRut
        company_data.address = address
        company_data.city = city
        company_data.region = region
        company_data.phone = phone
        company_data.facebook = facebook
        company_data.twitter = twitter
        company_data.linkedin = linkedin
        company_data.sloganLine1 = sloganLine1
        company_data.sloganLine2 = sloganLine2
        company_data.headerBadge = headerBadge

        db.session.commit()

        return {
            "ok": True,
            "companyData": company_data.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar los datos de la compañia"
        }, 500
    finally:
        db.session.close()

