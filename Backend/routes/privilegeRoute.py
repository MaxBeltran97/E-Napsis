import flask
from flask import request
from models.privilege import *
from models.userRole import *
from models.userRolePrivilege import *



privilege = flask.Blueprint('privilege', __name__)


@privilege.route('/api/privilege', methods=['GET'])
def get_privileges():
    try:
        all_privileges = Privilege.query.all()
        result = privileges_schema.dump(all_privileges)

        
        return {
            "ok": True,
            "privileges": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los privileges"
        }, 500

@privilege.route('/api/privilege/role/<identifierRole>', methods=['GET'])
def get_privilege_role(identifierRole):

    try:

        result = []
        role = UserRole.query.filter_by(identifierRole=identifierRole)

        privilegeDB = UserRolePrivilege.query.filter_by(user_role_id=role[0]._id)
        privilegeList = user_role_privilege_schemas.dump(privilegeDB)

        for i in privilegeList:
            privilege = Privilege.query.get(i['privilege_id'])
            result.append(privilege.serialize())

        return {
            "ok": True,
            "privileges": result
            
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el role"
        }, 500

@privilege.route('/api/privilege/role/<identifierRole>', methods=['PUT'])
def update_privilege_role(identifierRole):
    try:
        
        newPrivilege = request.json['privilege']
        role = UserRole.query.filter_by(identifierRole=identifierRole)

        privilegeDB = UserRolePrivilege.query.filter_by(user_role_id=role[0]._id)
        privilegeList = user_role_privilege_schemas.dump(privilegeDB)

        
        for i in privilegeList:
            privilege = UserRolePrivilege.query.filter_by(privilege_id=i['privilege_id'])
            db.session.delete(privilege[0])
            db.session.commit()

        for i in newPrivilege:
            new_user_privilege_role = UserRolePrivilege(role[0]._id, i['_id'])
            db.session.add(new_user_privilege_role)
            db.session.commit()

        return {
            "ok": True
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los privilegios"
        }, 500
    finally:
        db.session.close()

@privilege.route('/api/privilege/role', methods=['GET'])
def get_roles():
    try:
        all_roles = UserRole.query.all()
        result = privileges_schema.dump(all_roles)

        
        return {
            "ok": True,
            "roles": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los roles"
        }, 500