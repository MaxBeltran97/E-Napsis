import flask
from flask import request, Flask, send_file
from models.logo import *
from strgen import StringGenerator
import os
import os.path
import pandas as pd




app = Flask(__name__)

UPLOAD_FOLDER = 'assets/subCompanyLogos'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


logos = flask.Blueprint('logos', __name__)


@logos.route('/api/logos', methods=['POST'])
def add_logo():
    try:
        title = request.json['title']
        code = request.json['code']

        new_logo = Logo(title, code, '-')

        db.session.add(new_logo)
        db.session.commit()
        return {
            "ok": True,
            "logo": new_logo.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar el logo"
        }, 500
    finally:
        db.session.close()

@logos.route('/api/logos/upload_file/<_id>', methods=['PUT'])
def upload_file_logo(_id):
    try:
        logo = Logo.query.get(_id)
        
        #verificar si existe la imagen y eliminar
        if(logo.logo_img != '-'):
            path = os.path.join(
                    app.config["UPLOAD_FOLDER"], logo.logo_img)
            os.remove(path)
        
        file = request.files["logo_img"]

        filesplit = file.filename.split('.')
        extension = filesplit[len(filesplit)-1]

        flag = True
        while (flag):
            try:
                randomName = StringGenerator(
                    "[\l\d]{20}").render_list(1, unique=True)[0]
                nuevoNombreFile = randomName + "." + extension
                logo.logo_img = nuevoNombreFile
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

@logos.route('/api/logos', methods=['GET'])
def get_logos():
    try:
        all_logos = Logo.query.all()
        result = logos_schema.dump(all_logos)

        return {
            "ok": True,
            "logos": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los logos"
        }, 500

@logos.route('/api/logos/<_id>', methods=['GET'])
def get_logo(_id):

    try:
        logo = Logo.query.get(_id)
        return {
            "ok": True,
            "logo": logo.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el logo"
        }, 500

@logos.route('/api/logos/<_id>', methods=['PUT'])
def update_logo(_id):

    try:
        logo = Logo.query.get(_id)

        title = request.json['title']
        code = request.json['code']

        logo.title = title
        logo.code = code

        db.session.commit()

        return {
            "ok": True,
            "contract": logo.serialize()

        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el logo"
        }, 500

@logos.route('/api/logos/<_id>', methods=['DELETE'])
def delete_logo(_id):

    try:
        logo = Logo.query.get(_id)
        
        #verificar si existe la imagen y eliminar
        if(logo.logo_img != '-'):
            path = os.path.join(
                    app.config["UPLOAD_FOLDER"], logo.logo_img)
            os.remove(path)

        db.session.delete(logo)
        db.session.commit()

        
            
        return {
            "ok": True,
            "logo": logo.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el logo"
        }, 500
    finally:
        db.session.close()

@logos.route('/api/logos/get_imagen/<_id>', methods=['GET'])
def get_image(_id):
    try:
        logo = Logo.query.get(_id)

        path = os.path.join(
                    app.config["UPLOAD_FOLDER"], logo.logo_img)
        
        return send_file(path)

    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el logo"
        }, 500