import flask
from flask import request, Flask, send_file
from models.contract import *
from strgen import StringGenerator
import os
import os.path




app = Flask(__name__)

UPLOAD_FOLDER = 'assets/representativeSignature'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

contract = flask.Blueprint('contract', __name__)


@contract.route('/api/templates/contract', methods=['GET'])
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

@contract.route('/api/templates/contract/<_id>', methods=['GET'])
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

@contract.route('/api/templates/contract/<_id>', methods=['PUT'])
def update_contract(_id):

    try:
        contract = Contract.query.get(_id)

        title = request.json['title']
        header = request.json['header']
        content = request.json['content']
    
        
        contract.title = title
        contract.header = header
        contract.content = content
        
        
        db.session.commit()
        return {
            "ok": True,
            "contract": contract.serialize()

        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el contrato"
        }, 500

@contract.route('/api/templates/contract/upload_file/<_id>', methods=['PUT'])
def upload_file_contract(_id):
    try:
        contract = Contract.query.get(_id)

        #verificar si existe la imagen y eliminar
        if(contract.representativeSignature != '-'):
            path = os.path.join(
                    app.config["UPLOAD_FOLDER"], contract.representativeSignature)
            os.remove(path)
        
        file = request.files["representativeSignature"]

        filesplit = file.filename.split('.')
        extension = filesplit[len(filesplit)-1]

        flag = True
        while (flag):
            try:
                randomName = StringGenerator(
                    "[\l\d]{20}").render_list(1, unique=True)[0]
                nuevoNombreFile = randomName + "." + extension
                contract.representativeSignature = nuevoNombreFile
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

@contract.route('/api/templates/contract/get_image/<_id>', methods=['GET'])
def get_image(_id): 
    try:
        contract = Contract.query.get(_id)

        path = os.path.join(
                    app.config["UPLOAD_FOLDER"], contract.representativeSignature)

        return send_file(path)
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el contrato"
        }, 500