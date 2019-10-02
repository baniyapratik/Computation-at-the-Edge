FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install python3 -y
RUN apt-get install python3-pip -y

COPY communication_service /home/communication_service
RUN chmod 755 -R /home/communication_service/*.py

ENV PYTHONPATH "${PYTHONPATH}:/home/"

WORKDIR /home/communication_service
RUN pip3 install -r requirements.txt

CMD exec /bin/bash -c "python3 app.py"
