from kafka import KafkaProducer, KafkaConsumer
import json
import jsonify 
import time
from communication_service.utils.logger import LogFactory, ModWatchedFileHandler, SIMPLE_FORMATTER, DEFAULT_LEVEL


def get_kafka_producer():
    return KafkaProducer(
        bootstrap_servers=['10.46.0.1:9092',
                           '10.38.0.1:9092',
                           '10.40.0.1:9092'],
        value_serializer=lambda v: json.dumps(v).encode('utf-8'),
        request_timeout_ms=20000)

def get_kafka_consumer():
    return KafkaConsumer(
        bootstrap_servers=['10.46.0.1:9092',
                           '10.38.0.1:9092',
                           '10.40.0.1:9092'],
        auto_offset_reset='earliest',
        consumer_timeout_ms=1000)
#        value_serializer=lambda v: json.loads(v).encode('utf-8'))


#Test code
edgelogs = LogFactory('edge-cluster', handler=ModWatchedFileHandler, formatter=SIMPLE_FORMATTER)
try:
  consumer = get_kafka_consumer()
except Exception as e:
  edgelogs.error(str(e))
  
   

producer=get_kafka_producer()

def kafka_buffer(text,topic):
    producer.send(topic,text)

#    return True

    
def kafka_get(topic="mytopic"):

    consumer.subscribe(topic)
    result = []
    for message in consumer:
          topic = message.topic
          value = message.value
          result.append({"topic": topic, "value": value})
    #    consumer.poll(10)
    return result
    #print(consumer.poll())
    #    consumer.poll(10);
    #    time.sleep(10)

if __name__ == '__main__':
    kafka_get()

