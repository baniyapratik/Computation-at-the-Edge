import os
import platform
from flask import Flask, Response


def load_config(app, config):
    if not config:
        config = os.environ.get('INS_MODE', 'config')
    app.config.from_object('communication_service.{}.Config'.format(config))
    app.config['HOST_NAME'] = platform.uname()[1]
    app.config['HOST_PORT'] = os.environ.get('HOST_PORT', '3100')
    print(' * Running config {}...'.format(config.upper()))


def register_web_modules(app):
    #from flask_login import current_user
    #app.current_user = current_user
    from communication_service.modules.routes.routes import mod as node_module
    app.register_blueprint(node_module)

    return app


def create_app(config=None):
    app = Flask(__name__)
    load_config(app, config)
    app = register_web_modules(app)
    return app