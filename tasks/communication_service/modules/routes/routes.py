from flask import Blueprint, request, jsonify
from mqtt import MQTT
# from mqtt.MQTT import client, server

from communication_service.ext.api import APIResponse

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

	# publish test with curl
	#curl -d '{"topic":"test/message", "message":"yas"}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/communication/publish

@mod.route('subscribe/<string:topic>', methods=['GET'], strict_slashes=False)
def subscribe(topic):
	# limit check ?limit=100
	limit = request.args.get('limit') or 10
	server = MQTT()
	data = server.subscribe("localhost", topic, limit)
	return APIResponse(data)