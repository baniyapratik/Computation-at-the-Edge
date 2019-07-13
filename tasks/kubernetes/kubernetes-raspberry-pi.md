# Kubernetes on Raspberry Pi

Kubernetes installation tutorial:

https://medium.com/nycdev/k8s-on-pi-9cc14843d43

(upgrading one of my pi's: https://linuxconfig.org/how-to-upgrade-debian-8-jessie-to-debian-9-stretch)

Working from a Windows 10 machine:

```
PS> bash
$ tmux new -s pi-cluster
```

Split the pane horizontally

```
Ctrl-b + "
```

SSH into each pi in different panes

```
$ ssh pi@<ip-address>
```

Synchronize all panes

```
Ctrl-b + :
setw synchronize-panes
```

After hitting enter, commands entered into one pane will be sent to all panes.

Install Docker

```
curl -sSL get.docker.com | sh && \
sudo usermod pi -aG docker && \
newgrp docker
```

Turn off swap

```
sudo dphys-swapfile swapoff && \
sudo dphys-swapfile uninstall && \
sudo update-rc.d dphys-swapfile remove
```

Check that swap is really off

```
sudo swapon --summary
```

Edit /boot/cmdline.txt for cgroups configuration. Append this to the end of the line.

```
cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory
```

Reboot all pi's

```
sudo reboot
```

SSH again and add kubernetes distribution list

```
vi /etc/apt/sources.list.d/kubernetes.list
```

Add the following line

```
deb http://apt.kubernetes.io/ kubernetes-xenial main
```

Add the key for the package

```
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
```

Update package list

```
sudo apt-get update
```

Install kubeadm (includes kubectl)

```
sudo apt-get install -qy kubeadm
```



At this point we can unsynchronize the panes

```
Ctrl-b + :
setw synchronize-panes
```



### On the Master Node

1.  Pull necessary kubeadm images

   ```
   sudo kubeadm config images pull -v3
   ```

2. The following command makes sure that the token created will not expire. This should not be done in production.

   ```
   sudo kubeadm init --token-ttl=0
   ```

   **Note:** Keep track of the join-token produced 

3. Configure kubeconfig to allow normal user to run kubectl

   ```
   mkdir -p $HOME/.kube
   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
   sudo chown $(id -u):$(id -g) $HOME/.kube/config
   ```

4. Install weave net network driver

   ```
   kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
   ```

   

5. Wait a few minutes and check that everything worked

   ```
   kubectl get pods -n kube-system
   ```

   Output should look like the following

   ```
   NAME                                  READY   STATUS    RESTARTS   AGE
   coredns-fb8b8dccf-bkkms               1/1     Running   0          17m
   coredns-fb8b8dccf-zq5fn               1/1     Running   0          17m
   etcd-raspberrypi                      1/1     Running   0          17m
   kube-apiserver-raspberrypi            1/1     Running   0          17m
   kube-controller-manager-raspberrypi   1/1     Running   0          17m
   kube-proxy-44vm7                      1/1     Running   0          11m
   kube-proxy-rjbt2                      1/1     Running   0          11m
   kube-proxy-zd8fj                      1/1     Running   0          17m
   kube-scheduler-raspberrypi            1/1     Running   0          17m
   weave-net-2m664                       2/2     Running   0          14m
   weave-net-lxg9r                       2/2     Running   0          11m
   weave-net-zj6ns                       2/2     Running   1          11m
   ```

   If everything is not running within 10 minutes or so, then you will have to backtrack make sure that no command was missed and that every command completed successfully.

6. Run the following command so Kubernetes will pass preflight checks

   ```
   sudo sysctl net.bridge.bridge-nf-call-iptables=1
   ```



### On the Worker Nodes

1. Run the same command in step 8 from master node

   ```
   sudo sysctl net.bridge.bridge-nf-call-iptables=1
   ```

2. Join the master node (Use the same command with the token given from kubeadm init)

   ```
   kubeadm join 10.0.0.19:6443 --token sf1ho3.h14sx237wz2adg0a \
       --discovery-token-ca-cert-hash sha256:e4da4224d17ed4dcfc18c73f2c9b1d8cc9b96e18c09150e0659ad57292ae698d
   ```



### Back on the Master Node

1. In a few seconds, run

   ```
   kubectl get nodes
   ```

2. Output should be similar to the following

   ```
   NAME          STATUS   ROLES    AGE   VERSION
   blueberrypi   Ready    <none>   11m   v1.14.3
   cherrypi      Ready    <none>   11m   v1.14.3
   raspberrypi   Ready    master   17m   v1.14.3
   ```

   

3. Add role label to worker nodes

   ```
   kubectl label node cherrypi node-role.kubernetes.io/worker=worker
   
   kubectl label node blueberrypi node-role.kubernetes.io/worker=worker
   ```

4. Ensure labels were applied

   ```
   kubectl get nodes
   
   NAME          STATUS   ROLES    AGE   VERSION
   blueberrypi   Ready    worker   11m   v1.14.3
   cherrypi      Ready    worker   11m   v1.14.3
   raspberrypi   Ready    master   17m   v1.14.3
   ```

   













