FROM python:latest

RUN echo 'deb http://gr.archive.ubuntu.com/ubuntu/ focal main restricted' >> /etc/apt/sources.list

RUN apt install -y tzdata
    
ENV TZ="Europe/Athens"

WORKDIR /home/app

RUN pip install --upgrade pip
RUN pip install pipenv

RUN pip install requests
RUN pip install paho-mqtt