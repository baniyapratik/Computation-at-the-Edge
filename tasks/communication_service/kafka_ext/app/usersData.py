"""This module will serve the api request."""

from app import app
from flask import request, jsonify
from common import kafka_buffer, kafka_get
import json
#from app.common import kafka_buffer



@app.route("/")
def get_initial_response():
    """Welcome message for the API."""
    # Message to the user
    message = {
        'apiVersion': 'v1.0',
        'status': '200',
        'message': 'Welcome to the Flask API'
    }
    # Making the message looks good
    resp = jsonify(message)
    # Returning the object
    return resp




@app.route('/process/<string:topic>', methods=['POST'])
def process_data(topic):
    data = request.get_json()
    response = kafka_buffer(data,topic)
    return jsonify(data)

@app.route('/getdata/<string:topic>',methods=['GET'])
def get_data(topic):
   response=kafka_get(topic)
   return jsonify(response)

