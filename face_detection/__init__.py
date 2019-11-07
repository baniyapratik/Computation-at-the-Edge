from flask import Flask

def create_app():
    app = Flask(__name__)
    from .routes import mod as facedetection_module

    app.register_blueprint(facedetection_module)
    return app
