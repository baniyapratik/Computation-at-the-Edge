#### Images

| Image  | Size   |
| ------ | ------ |
| alpine | 3.74MB |
| nginx  | 88.4MB |



To create simple pods with images:

By default it will use the 'latest' image tag

```
$ kubectl run <deployment_name>  --image=<image>

i.e
$ kubectl run nginx --image=nginx
```



#### Alpine image test

Tried Alpine image first, however, the container needs to be doing some work. Otherwise, it will be in a 'CrashLoopBackOff' loop. Essentially it will create the pod, start it, crash, then repeat, indefinitely.



#### Nginx image test

Cluster Configuration 

Three nodes:

- 1 master
- 2 worker nodes

**Note**: Master will not be spawning pods on itself, pods will only be created on worker nodes



 ```
$ kubectl run nginx --image=nginx
$ kubectl scale deploy nginx --replicas=2
deployment.extensions/nginx scaled
 ```

These pods will take about a minute to be in running state

```
$ kubectl get pods -o wide

NAME                     READY   STATUS    RESTARTS   AGE    IP          NODE          nginx-7db9fccd9b-flxb6   1/1     Running   0          2m5s   10.36.0.1   cherrypi
nginx-7db9fccd9b-kl4zx   1/1     Running   0          11m    10.44.0.1   blueberrypi
```

Scaling to 10 replicas

 ```
$ kubectl scale deploy nginx --replicas=10
deployment.extensions/nginx scaled
$ kubectl get pods -o wide

NAME                     READY   STATUS    RESTARTS   AGE     IP          NODE

nginx-7db9fccd9b-7dtqm   1/1     Running   0          116s    10.36.0.4   cherrypi
nginx-7db9fccd9b-8sbr9   1/1     Running   0          116s    10.36.0.2   cherrypi
nginx-7db9fccd9b-b5p8c   1/1     Running   0          116s    10.44.0.4   blueberrypi
nginx-7db9fccd9b-flxb6   1/1     Running   0          4m46s   10.36.0.1   cherrypi
nginx-7db9fccd9b-gf25k   1/1     Running   0          116s    10.44.0.2   blueberrypi
nginx-7db9fccd9b-kl4zx   1/1     Running   0          13m     10.44.0.1   blueberrypi
nginx-7db9fccd9b-pndss   1/1     Running   0          116s    10.44.0.5   blueberrypi
nginx-7db9fccd9b-qbxp9   1/1     Running   0          116s    10.36.0.3   cherrypi
nginx-7db9fccd9b-vw868   1/1     Running   0          116s    10.44.0.3   blueberrypi
nginx-7db9fccd9b-zqprh   1/1     Running   0          116s    10.36.0.5   cherrypi

 ```



Scaling to 20 replicas was good and to my surprise, scaling to 50 replicas was also successful. Then I tried scaling to 100 ... the worker nodes weren't happy.



One of my Pi's crashed and kubernetes reported the node as 'NotReady'. Kubernetes said ok and tried to schedule pods on the other one, then that one crashed and became 'NotReady'. Both Pi's still were still on, but not responsive. I could no longer SSH into them, however, I could ping them.



I had to literally turn off the power to both pi's and plug them back in to SSH into them. One Pi rejoined the cluster without any issues. The other one didn't. I had to restart the docker service.

```
$ service docker restart
```

Cluster is now behaving and working properly



Just for kicks, I tried scaling to 70 replicas and the same issue occurred. So the limit is somewhere between 50 - 70 replicas for nginx containers.



