FROM debian:stretch 

RUN apt-get update 

RUN apt install librdkafka-dev -y
RUN apt-get install vim -y
RUN apt-get install python2.7 -y
RUN apt-get update -y
RUN apt-get install python-pip -y
RUN pip2 install kafka-python 
COPY kafka2 /home/kafka2
RUN chmod  755 /home/kafka2/communication.py && chmod 755 /home/kafka2/__init__.py && chmod 755 /home/kafka2/kafkaEngine.py && chmod 755 /home/kafka2/producer.py && chmod 755 /home/kafka2/subscriber.py 
CMD exec /bin/bash -c "trap : TERM INT; sleep infinity & wait"
