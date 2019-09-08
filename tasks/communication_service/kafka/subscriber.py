from kafkaEngine import KAFKA_ENGINE

class KAFKA_SUBSCRIBER:

    def __init__(self):
        pass

    def subscribe(self):
        client = KAFKA_ENGINE()
        client.subscribe()


if __name__ == '__main__':
    objp = KAFKA_SUBSCRIBER()
    objp.subscribe()