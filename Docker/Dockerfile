FROM ubuntu

RUN apt-get update && \
    apt-get install -yq tzdata
    
ENV TZ="Europe/Athens"

RUN apt-get update && apt-get install -y \
    sudo \
    curl

RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -\
    && apt-get install -y \
        nodejs \
    && npm install -g npm@8.19.3

RUN npm install -g npm@9.1.1

RUN apt-get clean \
    && apt-get -y upgrade \
    && apt-get update

WORKDIR /home/app