from database.db import db
from database.db import ma
from helpers.serializable import Serializer

class UserRolePrivilege(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key = True)
    user_role_id = db.Column(db.Integer, db.ForeignKey('user_role._id'))
    privilege_id = db.Column(db.Integer, db.ForeignKey('privilege._id'))

    def __init__(self, user_role_id, privilege_id):
        self.user_role_id = user_role_id
        self.privilege_id = privilege_id
    
    def serialize(self):
            d = Serializer.serialize(self)
            return d


class UserRolePrivilegeSchema(ma.Schema):
    class Meta:
        fields = ('user_role_id', 'privilege_id')


user_role_privilege_schemas = UserRolePrivilegeSchema(many=True)