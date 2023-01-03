import flask
from flask import request
from models.templatesEmail import *

templatesEmail = flask.Blueprint('templates', __name__)


@templatesEmail.route('/api/templates/email', methods=['GET'])
def get_templates_email():
    try:
        all_templates = TemplatesEmail.query.all()
        result = templates_email_schema.dump(all_templates)
        return {
            "ok": True,
            "templateEmails": result
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener los templates"
        }, 500


@templatesEmail.route('/api/templates/email/<_id>', methods=['GET'])
def get_template_email(_id):

    try:
        template = TemplatesEmail.query.get(_id)
        return {
            "ok": True,
            "templateEmail": template.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al obtener el template"
        }, 500


@templatesEmail.route('/api/templates/email/<_id>', methods=['PUT'])
def update_template_email(_id):

    try:
        template = TemplatesEmail.query.get(_id)

        subject = request.json['subject']
        content = request.json['content']

        template.subject = subject
        template.content = content

        db.session.commit()
        return {
            "ok": True,
            "templateEmail": template.serialize()
        }, 200
    except Exception as e:
        print(e)
        return {
            "ok": False,
            "msg": "Error al actualizar el template"
        }, 500
    finally:
        db.session.close()
