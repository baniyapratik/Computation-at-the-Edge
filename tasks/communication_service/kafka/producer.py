from kafkaEngine import KAFKA_ENGINE

class KAFKA_PRODUCER:

    def __init__(self):
        pass

    def produce(self):
        client = KAFKA_ENGINE()
        client.publish()


if __name__ == '__main__':
    objp = KAFKA_PRODUCER()
    objp.produce()
