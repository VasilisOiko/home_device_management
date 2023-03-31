FROM python:latest

RUN echo 'deb http://gr.archive.ubuntu.com/ubuntu/ focal main restricted' >> /etc/apt/sources.list

RUN apt install -y tzdata
    
ENV TZ="Europe/Athens"

# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
#     && apt-get update \
#     && apt-get install -y tzdata
    
WORKDIR /home/app

RUN pip install --upgrade pip
RUN pip install pipenv

RUN pip install Django==4.1.6
RUN pip install djangorestframework
RUN pip install paho-mqtt
RUN pip install django-cors-headers
RUN python -m pip install -U channels["daphne"]

