Build communication service Docker image
```
$ docker build -t communication-service .
```

To run service locally, use docker-compose
```
cd docker-compose
docker-compose up -d
```

To run within Kubernetes environment, within the master node
```
kubectl apply -f communication-service.yml
```
