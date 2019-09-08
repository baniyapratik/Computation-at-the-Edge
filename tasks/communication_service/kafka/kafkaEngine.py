import sys
sys.path.append('../../tasks') 

from communication_service.communication import Communication
#from communication import Communication

from kafka import KafkaConsumer
from kafka import KafkaProducer
from kafka import TopicPartition
import time

class KAFKA_ENGINE(Communication):

    def publish(self):
        producer = KafkaProducer(bootstrap_servers='localhost:9092')

        while 1:
            producer.send("mytopic","Message from server.........")
            time.sleep(10)
        producer.flush()


    def subscribe(self):
        consumer = KafkaConsumer(bootstrap_servers='localhost:9092',
                                 auto_offset_reset='earliest',
                                 consumer_timeout_ms=1000)
        consumer.subscribe(['mytopic'])

        while 1:
            for msg in consumer:
                print (msg)
            time.sleep(10)
