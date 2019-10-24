from logger import LogFactory, ModWatchedFileHandler, DEFAULT_FORMATTER, Log_Folder_Name

myLogs = LogFactory(Log_Folder_Name, handler=ModWatchedFileHandler, formatter=DEFAULT_FORMATTER)
