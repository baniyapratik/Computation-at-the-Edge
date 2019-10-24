import logging
import os
from logging.handlers import WatchedFileHandler
import random
import platform, re
from collections import OrderedDict

"""
     logging.StreamHandler: Sends logging output to streams such as stderr/out
     logging.FORMATTER: Specify the layout of log record
"""

DEFAULT_LEVEL = logging.DEBUG
DEFAULT_HANDLER = logging.StreamHandler
DEFAULT_FORMATTER = logging.Formatter(' %(levelname)s - %(asctime)s - %(message)s')
SIMPLE_FORMATTER = logging.Formatter('%(asctime)s - %(message)s')
confg_path = os.path.dirname(os.path.abspath(__file__)) + '/config.txt'
temp_dict = OrderedDict()

with open(confg_path) as fp:
    for line in fp:
        l = []
        l.append(line.split('='))
        n = l[0][0]
        m = re.search('=.+', line).group(0)
        m = m.replace('=', '').strip()
        temp_dict[str(n)] = m

fp.close()
info = list(temp_dict.items())
Path = info[0][1]
Log_Folder_Name = info[1][1]
EXT_NAME = 'loggers'
LOG_DIR = Path + '/' + Log_Folder_Name

# This class make sure that every application -
# that run this module access the path and be -
# able to write on it.
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
        # If log file with specified names exist
        log_type_name = self.name.rsplit('.', 1)
        if len(log_type_name) == 1:
            log_type_name = log_type_name[0]
        else:
            log_type_name = log_type_name[1]
        log_file_name = info[2][1].strip() + '.log'
        if self.handler_cls is logging.StreamHandler:
            hdl = self._init_handler()
        else:
            #if 'log_folder' or any other specifies name doesn't exist, create it.
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

