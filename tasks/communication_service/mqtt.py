from communication import Communication
import paho.mqtt.client as mqtt
import time

class MQTT(Communication):
	def publish(self, topic, message):
		print("publishing the message '" + message + "' to the topic '" + topic + "'")

		paho_client.connect("localhost", 1883, 60)
		paho_client.loop_start()

		infot = paho_client.publish(topic, message, qos=2)
		infot.wait_for_publish()

	def subscribe(self, topic):
		print("subscribing to topic '" + topic + "'")
		paho_client.connect("localhost", 1883, 60)
		paho_client.subscribe(topic, 0)
		paho_client.loop_start()
		time.sleep(5)
		paho_client.loop_stop()

def on_connect(paho_client, obj, flags, rc):
    print("rc: " + str(rc))


def on_message(paho_client, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))


def on_publish(paho_client, obj, mid):
    print("mid: " + str(mid))
    pass


def on_subscribe(paho_client, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))


paho_client = mqtt.Client()
paho_client.on_message = on_message
paho_client.on_connect = on_connect
paho_client.on_publish = on_publish
paho_client.on_subscribe = on_subscribe


client = MQTT()
#client.create_topic()
#client.publish("test/message", "something else")
client.subscribe("test/data")