from database.db import db
from database.db import ma
from helpers.serializable import Serializer


class CourseActivityContentHours(db.Model, Serializer):
    _id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course._id'))
    activity = db.Column(db.String(500))
    content = db.Column(db.String(500))
    theoreticalHour = db.Column(db.Integer)
    practiceHour = db.Column(db.Integer)
    eLearningHour = db.Column(db.Integer)

    def __init__(self, course_id, activity, content, theoreticalHour, practiceHour, eLearningHour):
        self.course_id = course_id
        self.activity = activity
        self.content = content
        self.theoreticalHour = theoreticalHour
        self.practiceHour = practiceHour
        self.eLearningHour = eLearningHour

    def serialize(self):
        d = Serializer.serialize(self)
        return d


class CourseActivityContentHoursSchema(ma.Schema):
    class Meta:
        fields = ('_id', 'activity', 'content',
                  'theoreticalHour', 'practiceHour', 'eLearningHour')


course_course_activity_content_hours_schema = CourseActivityContentHoursSchema()
course_course_activity_content_hours_schemas = CourseActivityContentHoursSchema(
    many=True)
