Build communication service Docker image
```
$ docker build -t communication-service .
```

To run within Kubernetes environment, within the master node
```
kubectl apply -f communication-service.yml
```
