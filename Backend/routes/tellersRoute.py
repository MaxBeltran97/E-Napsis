import flask
from flask import request
from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager, verify_jwt_in_request
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from models.teller import *
from models.userRole import *
from models.user import *
from models.courseTeller import *
from models.tellerUploadFile import *
from strgen import StringGenerator
import string
import secrets
import os

tellers = flask.Blueprint('tellers', __name__)

ALLOWED_EXTENSIONS = set(["pdf", "docx", "png", "jpg"])

@tellers.route('/api/teller', methods=['POST'])
def add_teller():
    try:
        nationalityType = request.json['nationalityType']
        rut = request.json['rut']
        fullName = request.json['fullName']
        lastName = request.json['lastName']
        motherLastName = request.json['motherLastName']
        nationality = request.json['nationality']
        birthday = request.json['birthday']
        profession = request.json['profession']
        email = request.json['email']
        cellPhone = request.json['cellPhone']
        maritalStatus = request.json['maritalStatus']
        address = request.json['address']
        region = request.json['region']
        commune = request.json['commune']
        situation = request.json['situation']
        reuf = request.json['reuf']

        # TODO: variable para un tipo de rol de Relator
        uploadFiles = request.json['uploadFiles']

        new_teller = Teller(nationalityType, rut, fullName, lastName, motherLastName, nationality,
                                 birthday, profession, email, cellPhone, maritalStatus, address, region, commune, situation, reuf, None)

        db.session.add(new_teller)
        db.session.commit()

        alphabet = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(alphabet) for i in range(10))
        # --- nuevo cambio
        hashed_password = generate_password_hash(password, method='sha256')
        # --- fin nuevo cambio
        i = 1

        usernameGenerated = fullName[0].lower() + lastName.title()

        users = User.query.filter_by(username=usernameGenerated)

        if (users.count() == 1):
            usernameGenerated = fullName[0:3].lower() + lastName.title()
            users = User.query.filter_by(username=usernameGenerated)
            if (users.count() == 1):
                while (True):
                    usernameGenerated = fullName[0:3].lower(
                    ) + lastName.title() + str(i)
                    users = User.query.filter_by(username=usernameGenerated)
                    if (users.count() == 0):
                        break
                    i += 1

        # --- nuevo cambio
        if (uploadFiles == True):
            tellerRole = UserRole.query.filter_by(
                name='teller_with_upload').first()
        else:
            tellerRole = UserRole.query.filter_by(name='teller').first()

        new_user = User(usernameGenerated, hashed_password, email=email,
                        avatar=None, role=tellerRole.identifierRole)

        print(new_user.username)
        print(password)

        db.session.add(new_user)
        db.session.commit()

        teller = Teller.query.get(new_teller._id)
        teller.user_id = new_user._id

        db.session.commit()

        # --- fin nuevo cambio

        return {
            "ok": True,
            "teller": teller.serialize()
        }, 201
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al guardar el relator"
        }, 500
    finally:
        db.session.close()


@tellers.route('/api/teller', methods=['GET'])
def get_tellers():
    try:
        all_tellers = Teller.query.all()
        result = tellers_schema.dump(all_tellers)
        return {
            "ok": True,
            "tellers": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los relatores"
        }, 500


@tellers.route('/api/teller/<_id>', methods=['GET'])
def get_teller(_id):
    try:
        teller = Teller.query.get(_id)
        return {
            "ok": True,
            "teller": teller.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el relator"
        }, 500


@tellers.route('/api/teller/<_id>', methods=['PUT'])
def update_teller(_id):
    try:
        teller = Teller.query.get(_id)

        nationalityType = request.json['nationalityType']
        rut = request.json['rut']
        fullName = request.json['fullName']
        lastName = request.json['lastName']
        motherLastName = request.json['motherLastName']
        nationality = request.json['nationality']
        birthday = request.json['birthday']
        profession = request.json['profession']
        email = request.json['email']
        cellPhone = request.json['cellPhone']
        maritalStatus = request.json['maritalStatus']
        address = request.json['address']
        region = request.json['region']
        commune = request.json['commune']
        situation = request.json['situation']
        reuf = request.json['reuf']

        teller.nationalityType = nationalityType
        teller.rut = rut
        teller.fullName = fullName
        teller.lastName = lastName
        teller.motherLastName = motherLastName
        teller.nationality = nationality
        teller.birthday = birthday
        teller.profession = profession
        teller.email = email
        teller.cellPhone = cellPhone
        teller.maritalStatus = maritalStatus
        teller.address = address
        teller.region = region
        teller.commune = commune
        teller.situation = situation
        teller.reuf = reuf

        db.session.commit()
        return {
            "ok": True,
            "teller": teller.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el relator"
        }, 500
    finally:
        db.session.close()


# --- nuevo cambio ---
@tellers.route('/api/teller/<_id>', methods=['DELETE'])
def delete_teller(_id):
    try:
        teller = Teller.query.get(_id)
        user = User.query.get(teller.user_id)
        courses_teller = CourseTeller.query.filter_by(teller_id=_id)

        for item in courses_teller:
            db.session.delete(item)
            db.session.commit()
        
        db.session.delete(teller)
        db.session.commit()

        db.session.delete(user)
        db.session.commit()

        return {
            "ok": True,
            "teller": teller.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al eliminar el relator"
        }, 500
    finally:
        db.session.close()
# --- fin nuevo cambio ---

@tellers.route('/api/teller/uploadfile', methods=['POST'])
def upload_file_teller():
    try:
        file = request.files["uploadFile"]
        teller_id = request.form["teller_id"]
        name = request.form["name"]

        filesplit = file.filename.split('.')
        extension = filesplit[len(filesplit)-1]

        flag = True
        while (flag):
            try:
                randomName = StringGenerator(
                    "[\l\d]{20}").render_list(1, unique=True)[0]
                nuevoNombreFile = teller_id + randomName + "." + extension
                new_tellerUpload = TellerUploadFile(
                    teller_id, name, nuevoNombreFile)

                db.session.add(new_tellerUpload)
                db.session.commit()

                file.save(os.path.join(
                    tellers.config["assets/tellerFiles"], nuevoNombreFile))
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
