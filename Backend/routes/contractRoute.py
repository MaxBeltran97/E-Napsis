import flask
from flask import request
from models.contract import *




contract = flask.Blueprint('contract', __name__)



@contract.route('/api/contract', methods=['GET'])
def get_contracts():

    try:
        all_contracts = Contract.query.all()
        result = contracts_schema.dump(all_contracts)
        return {
            "ok": True,
            "contracts": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los contratos"
        }, 500

@contract.route('/api/contract/<_id>', methods=['GET'])
def get_contract(_id):

    try:
        contract = Contract.query.get(_id)
        return {
            "ok": True,
            "contract": contract.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el contrato"
        }, 500