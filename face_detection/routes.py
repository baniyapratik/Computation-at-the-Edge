from flask import Blueprint, request

mod = Blueprint('gateway', __name__, url_prefix='/api/device')

@mod.route('/test', methods=['GET'], strict_slashes=False)
def test_api():
	return APIResponse()

@mod.route("/functions", methods=["POST"], strict_slashes=False)
def add_functons():
    pass

@mod.route("/functions", methods=['DELETE'], strict_slashes=False)
def remove_functions():
    pass

@mod.route("/functions", methods=['GET'], strict_slashes=False)
def list_functions():
    pass
