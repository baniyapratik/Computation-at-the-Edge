from flask import Blueprint, request, jsonify
from mqtt import MQTT
# from mqtt.MQTT import client, server

from communication_service.ext.api import APIResponse
from communication_service.kafka_ext.common import kafka_buffer, kafka_get
mod = Blueprint('gateway', __name__, url_prefix='/api/communication')

@mod.route('test', methods=['GET'], strict_slashes=False)
def test_api():
	return APIResponse()

@mod.route('publish/<string:topic>', methods=['POST'], strict_slashes=False)
def publish(topic):
	client = MQTT()
	data = request.get_json()
	#topic = data.get('topic', '')
	message = data.get('message', '')
	client.publish("localhost", topic, message)
	return APIResponse("Published message: " + message + " to topic: " + topic)

@mod.route('subscribe/<string:topic>', methods=['GET'], strict_slashes=False)
def subscribe(topic):
	# limit check ?limit=100
	limit = request.args.get('limit') or 10
	server = MQTT()
	data = server.subscribe("localhost", topic, limit)
	return APIResponse(data)

@mod.route('/process/<string:topic>', methods=['POST'], strict_slashes=False)
def process_data(topic):
    data = request.get_json()
    response = kafka_buffer(data,topic)
    return jsonify(data)

@mod.route('/getdata/<string:topic>',methods=['GET'], strict_slashes=False)
def get_data(topic):
   response=kafka_get(topic)
   return APIResponse(response)
