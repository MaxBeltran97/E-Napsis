from database.db import db
from database.db import ma
from helpers.serializable import Serializer



class CheckListActivity(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer)
    activity = db.Column(db.String(400))
    status = db.Column(db.String(50))
    date = db.Column(db.DateTime)
    roleActivity = db.Column(db.String(100))
    checkList_id = db.Column(
        db.Integer, db.ForeignKey('check_list._id'))


    def __init__(self,checkList_id, order, activity, status, date, roleActivity):
        self.checkList_id = checkList_id
        self.order = order
        self.activity = activity
        self.status = status
        self.date = date
        self.roleActivity = roleActivity
        

    def serialize(self):
        d = Serializer.serialize(self)
        return d

class CheckListActivitySchema(ma.Schema):
    class Meta:
        fields = ('_id', 'order', 'activity', 'status', 'date', 'roleActivity')

check_list_activity_schema = CheckListActivitySchema(many=True)
    