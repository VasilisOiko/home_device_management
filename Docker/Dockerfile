FROM tomcat

RUN apt-get update && \
    apt-get install -yq tzdata
    
ENV TZ="Europe/Athens"

RUN apt-get update && apt-get install -y \
        build-essential  \
        sudo \
    && apt-get clean \
    && apt-get -y upgrade \
    && apt-get update

RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -\
    && apt-get install -y \
        nodejs \
    && apt-get clean \
    && apt-get -y upgrade \
    && apt-get update \
    && npm install -g npm@8.19.3


WORKDIR /usr/local/tomcat/webapps/app


# CMD [ "/bin/bash" ]