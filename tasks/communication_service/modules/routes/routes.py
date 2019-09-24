from flask import Blueprint
from communication_service.ext.api import APIResponse

mod = Blueprint('gateway', __name__, url_prefix='/api/communication')

@mod.route('test', methods=['GET'], strict_slashes=False)
def test_api():
	return APIResponse()
	