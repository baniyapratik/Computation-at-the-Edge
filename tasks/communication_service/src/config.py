import os


class Config(object):
    DEV_MODE = True
    SECRET_KEY = '\x96\xd9\nC5U\xcc\xe9!GL\xf2\x04\x9f\x97\xd9\x10-\x1b\xa2U\xe9\xb5\x1b'
    TOKEN_SECRET_KEY = '\x93\xe0q\x0e\xa8\\\xcf\x9fA.\xf2~\x93\n\xd8\xa6\x9f\xec\x96\xddR#\x82Hu\xa4\x05\xedl}s\x1a'
    PERMISSION_SECRET_KEY = "\xd24\xff\xe5\x1c\xd6f[\x1a*\xe5\xf6!\xef.\x94\xd9!\xcco\x04'\x12Q"

    SERVER_LISTENING = '127.0.0.1'
    SERVER_SCHEME = 'https'
    ENV = 'config'

    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
    ENV_ROOT = os.path.dirname(os.path.dirname(PROJECT_ROOT))
    LOG_DIR = os.path.join(ENV_ROOT, 'log_folder')
    SECURITY_LOG_DIR = os.path.join(ENV_ROOT, 'log_folder')
    CACHE_DIR = os.path.join(ENV_ROOT, 'cache')
    UPLOAD_DIR = os.path.join(ENV_ROOT, 'upload')
    EXPORT_DIR = os.path.join(ENV_ROOT, 'export')

    LOG_LEVEL = 'DEBUG'
    LOG_RATE = 1



