from collections import OrderedDict
from bson.objectid import ObjectId
from json import JSONEncoder
from flask import Response
from datetime import date, datetime
import json
import pytz

tz = pytz.timezone('US/Pacific')


class CustomJSONEncoder(JSONEncoder):
    """The custom JSON encoder.

    This one extends the JSON encoder by also supporting ``datetime`` and
    ``date`` objects which are serialized as iso format strings.
    """

    def default(self, o):
        try:
            if isinstance(o, datetime):
                return tz.localize(o).isoformat()
            elif isinstance(o, date):
                return tz.localize(o).isoformat()
            elif isinstance(o, ObjectId):
                return str(o)
            elif hasattr(o, '__to_json__'):
                return o.__to_json__()
            iterable = iter(o)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, o)

class APIExceptionMsg:

    def __init__(self, exc_type: str, exc_msg: str=''):
        self.type = exc_type
        self.msg = exc_msg


class APIErrorMsg(APIExceptionMsg):

    def __init__(self, error_type: str='internal', error_msg: str=''):
        super().__init__(error_type, error_msg)


class APIWarningMsg(APIExceptionMsg):

    def __init__(self, warning_type: str='warning', warning_msg: str=''):
        super().__init__(warning_type, warning_msg)
        
class APIResponse(Response):
    default_mimetype = "application/json; charset=utf-8"

    def __init__(self, data=None, status: int=200,
                 error: APIErrorMsg=None,
                 warning: APIWarningMsg=None,
                 json_encoder: JSONEncoder=CustomJSONEncoder, **kwargs):

        super().__init__(status=status, **kwargs)

        if 400 <= status <= 550:
            self.ok = False
        else:
            self.ok = True

        self.response = OrderedDict({'ok': self.ok})
        if error:
            self.response['error'] = vars(error)
        if warning:
            self.response['warning'] = vars(warning)

        # will be false if data is an empty list of dictionary, must be compared to None.
        if data is not None:
            self.response.update({'data': data})

        self.set_data(json.dumps(self.response, cls=json_encoder))
