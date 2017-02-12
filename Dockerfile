FROM node

RUN npm install -g gulp

WORKDIR /src
CMD npm install && \
    gulp watch
