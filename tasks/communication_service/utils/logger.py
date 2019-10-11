import logging
import os
from logging.handlers import WatchedFileHandler
import random
import platform

SECURITY_LOG_DIR = os.path.abspath(os.path.dirname('__file__'))
PROJECT_ROOT = os.path.abspath(os.path.dirname('__file__'))
ENV_ROOT = os.path.dirname(os.path.dirname(PROJECT_ROOT))

# REVIEW_BOT_LIST = os.path.join(PROJECT_ROOT, 'cafy_words_list.txt')
JOB_DIR = os.path.join(ENV_ROOT, 'job_folder')
LOG_DIR = os.path.join(ENV_ROOT, 'log_folder')
LOG_LEVEL = 'DEBUG'
LOG_RATE = 1

EXT_NAME = 'loggers'

DEFAULT_LEVEL = logging.DEBUG
DEFAULT_HANDLER = logging.StreamHandler
DEFAULT_FORMATTER = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
SIMPLE_FORMATTER = logging.Formatter('%(asctime)s - %(message)s')

#This class make sure that every application that run this module
class ModWatchedFileHandler(WatchedFileHandler):

    def _open(self):
        if os.path.exists(self.baseFilename):
            existed = True
        else:
            existed = False
        file = super()._open()
        if not existed:
            os.chmod(self.baseFilename, 0o777)
        return file

class LogFactory:

    def __init__(self, name,
                 level=DEFAULT_LEVEL,
                 handler=DEFAULT_HANDLER,
                 handler_args: tuple = None,
                 formatter=DEFAULT_FORMATTER,
                 ):
        """
        :param name: log name, log file will be named to <name>.log
        :param level: log level
        :param handler: log handler class
        :param tuple handler_args: custom log handler's parameters, (args, kwargs)
        :param formatter: log formatter
        """
        self.name = name
        self.level = level
        self.handler_cls = handler
        self.handler_args = handler_args
        self.formatter = formatter
        self.logger = None
        self.init_app()

    def init_app(self):
        log_dir = LOG_DIR
        self.level = getattr(logging,LOG_LEVEL, DEFAULT_LEVEL)
        # cafy log name example cafy.gateway.app, cafy.api.action
        # and their log type name will be app and action

        log_type_name = self.name.rsplit('.', 1)
        # we may want to put the security log to a different folder
        if log_type_name == 'security':
            log_dir = SECURITY_LOG_DIR or log_dir
        if len(log_type_name) == 1:
            log_type_name = log_type_name[0]
        else:
            log_type_name = log_type_name[1]
        log_file_name = '.'.join([
            log_type_name,
            platform.node(), "prod"]) + '.log'
        if self.handler_cls is logging.StreamHandler:
            hdl = self._init_handler()
        else:
            if not os.path.exists(log_dir):

                os.makedirs(log_dir, exist_ok=True)
            # create a folder to group time rotating logs
            if issubclass(self.handler_cls, logging.FileHandler):
                # Make a directory for the log file, this directory will
                # have the current log file and the rotated log files
                dir_path = os.path.join(log_dir, self.name)
                if not os.path.exists(dir_path):
                    os.makedirs(dir_path, exist_ok=True)
                fp = os.path.join(dir_path, log_file_name)
                if not os.path.exists(fp):
                    open(fp, 'w').close()
                    os.chmod(fp, 0o777)
                hdl = self._init_handler(fp)
            else:
                raise TypeError('Unsupported log handler type. ')

        hdl.setLevel(self.level)
        hdl.setFormatter(self.formatter)
        logger = logging.getLogger(self.name)
        logger.addHandler(hdl)
        logger.setLevel(self.level)

        self.logger = logger

    def _init_handler(self, *args, **kwargs):
        if not self.handler_args:
            return self.handler_cls(*args, **kwargs)
        else:
            if self.handler_args[0]:
                args = self.handler_args[0]
            kwargs.update(self.handler_args[1])
            return self.handler_cls(*args, **kwargs)

    def __getattr__(self, item):
        return getattr(self.logger, item)

