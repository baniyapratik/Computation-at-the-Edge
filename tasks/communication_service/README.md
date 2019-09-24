#### Running Communication Service REST API's

Set the virtual environment
 
```
python3 -m venv your-new-environment
source your-new-environment/bin/activate
```

Set PYTHONPATH to git-repo/tasks

```
cd ../
export PYTHONPATH=$(pwd)
```

Run the application

```
python3 app.py
```

Test the REST api's

```
curl http://localhost:5000/api/communication/test
```

#### Reference

- https://github.com/baniyapratik/raft_service
