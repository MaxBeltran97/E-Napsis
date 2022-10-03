
from flask_script import Manager
from app import app
from database.db import db
from getpass import getpass
from models.teller import Teller

# IMPORTACIÓN DE MODELOS

with app.app_context():
    db.create_all()

manager = Manager(app)
#app.config['DEBUG'] = True # Ensure debugger will load.




if __name__ == '__main__':
    manager.run()