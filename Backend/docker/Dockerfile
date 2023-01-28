

# FROM python:3.9.16-slim


# WORKDIR /app
# COPY . /app
# RUN pip3 --no-cache-dir install -r requirements.txt
# EXPOSE 5000
# CMD python3 manage.py runserver


# Use an official Python runtime as the base image
FROM python:3.9.16-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install required packages
RUN apt-get update && apt-get install -y default-libmysqlclient-dev
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the application files into the container
COPY . .

# Run the command to start the application
CMD ["python", "main.py"]



# # #CMD ["python3", "Backend/app.py"]

# # Use Alpine 3.13 as the base image
# FROM alpine:3.13

# # Install the required libraries
# RUN apk add --no-cache python3 python3-dev build-base libffi-dev openssl-dev
# RUN apk add --no-cache py3-pip
# RUN pip3 install PyMySQL
# RUN pip3 install aniso8601==9.0.1 async-timeout==4.0.2 autopep8==2.0.0 blinker==1.5 cffi==1.15.1 click==8.1.3 colorama==0.4.5 cryptography==38.0.1 Deprecated==1.2.13 distlib==0.3.6 et-xmlfile==1.1.0 filelock==3.8.0 Flask==2.2.2 Flask-Cors==3.0.10 Flask-JWT-Extended==4.4.4 Flask-Login==0.6.2 Flask-Mail==0.9.1 flask-marshmallow==0.14.0 Flask-MySQLdb==1.0.1 flask-redis==0.4.0 Flask-RESTful==0.3.9 Flask-Script==2.0.6 Flask-SQLAlchemy==2.5.1 greenlet==1.1.3 itsdangerous==2.1.2 Jinja2==3.1.2 MarkupSafe==2.1.1 marshmallow==3.18.0 marshmallow-sqlalchemy==0.28.1 mysql-connector-python==8.0.30 numpy==1.24.1 openpyxl==3.0.10 packaging==21.3 pandas==1.5.0 platformdirs==2.5.2 protobuf==3.20.1 pycodestyle==2.9.1 pycparser==2.21 PyJWT==2.6.0 PyMySQL==1.0.2 pyparsing==3.0.9 python-dateutil==2.8.2 python-dotenv==0.21.0 pytz==2022.2.1 PyYAML==6.0 redis==4.3.4 six==1.16.0 SQLAlchemy==1.4.42 strgen==1.3.1 StringGenerator==0.4.4 tablib==3.2.1 tomli==2.0.1 virtualenv==20.16.5 Werkzeug==2.2.2 wrapt==1.14.1 xlrd==2.0.1

# # Add your application code to the image
# COPY . /app

# # Set the working directory
# WORKDIR /app

# # Set the entry point for the container
# ENTRYPOINT ["python3"]

# # Set the command to run when the container starts
# CMD ["your_script.py"]