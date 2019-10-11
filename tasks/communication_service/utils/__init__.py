from logger import LogFactory, ModWatchedFileHandler, SIMPLE_FORMATTER, DEFAULT_LEVEL

myLogs = LogFactory('edge-test', handler=ModWatchedFileHandler, formatter=SIMPLE_FORMATTER)
