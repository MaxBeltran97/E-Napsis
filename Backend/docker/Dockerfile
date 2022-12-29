FROM alpine:3.1.7

# RUN apk add --no-cache python3-dev &&\
#     pip3 install --upgrade pip setuptools

# RUN pip install --upgrade pip

# RUN apk add --no-cache python3-dev gcc && \
#     python3 -m ensurepip && \
#     rm -r /usr/lib/python*/ensurepip && \
#     pip3 install --upgrade pip setuptools && \
#     if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
#     if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
#     rm -r /root/.cache
# RUN poetry lock
# RUN pip install poetry
# RUN pip install --upgrade pip

# RUN pip3 install numpy

#RUN apk update && apk add wkhtmltopdf xvfb

# RUN apk --no-cache add msttcorefonts-installer fontconfig && \
#     update-ms-fonts && \
#     fc-cache -f

RUN apk add --no-cache python3 && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -r /root/.cache



WORKDIR /app
COPY . /app
RUN apk update && apk add mysql-client
RUN pip3 --no-cache-dir install -r requirements.txt
EXPOSE 5000
CMD python3 manage.py runserver


#CMD ["python3", "Backend/app.py"]

