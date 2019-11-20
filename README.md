# Computation-at-the-Edge


## Test/Develop MQTT server:
File location: tasks/mosquitto/mqtt_server_dockercompose.yml
Execute: docker-compose -f tasks/mosquitto/mqtt_server_dockercompse.yml up -d
verify: docker ps | grep mosquitto

# Setting up the network
## Checking the IP address 
```JSON
pi@slave-1:~ $ ifconfig
eth0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        ether b8:27:eb:12:d9:cd  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 9  bytes 524 (524.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 9  bytes 524 (524.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.10  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::4ce7:7989:f4ef:293  prefixlen 64  scopeid 0x20<link>
        ether 00:0f:60:03:cc:8b  txqueuelen 1000  (Ethernet)
        RX packets 235  bytes 26432 (25.8 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 89  bytes 13857 (13.5 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

pi@slave-1:~ $ netstat -nr
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG        0 0          0 wlan0
192.168.1.0     0.0.0.0         255.255.255.0   U         0 0          0 wlan0
```

## Static IP
```JSON
 sudo cat /etc/network/interfaces
```
```JSON
auto eth0
allow-hotplug eth0
iface eth0 inet static 
address 192.168.1.10
netmask 255.255.255.0
```
Restarting the network
```JSON
sudo /etc/init.d/networking restart
```

## set the host
```JSON
192.168.1.10    slave-1
192.168.1.9     slave-2
192.168.1.11    slave-3
192.168.1.58    master-node
```
add the above in the file ```JSON sudo vim /etc/hosts``` in all the nodes

## create a common user
Cred: ops:raspberry123
```JSON
pi@slave-1:~ $ sudo useradd -m -u 2345 ops
pi@slave-1:~ $ ls -la /home
total 16
drwxr-xr-x  4 root root 4096 Nov 19 23:24 .
drwxr-xr-x 21 root root 4096 Sep 25 17:46 ..
drwxr-xr-x  2 ops  ops  4096 Nov 19 23:24 ops
drwxr-xr-x 17 pi   pi   4096 Nov 19 23:06 pi
pi@slave-1:~ $ sudo passwd ops
New password: 
Retype new password: 
passwd: password updated successfully
pi@slave-1:~ $ 
pi@slave-1:~ $ su - ops
Password: 
ops@slave-1:~ $ exit
logout
pi@slave-1:~ $
```

## password less SSH
Note: currently its not working, TODO
Generate the ssh keys i.e in /home/ops/.ssh
```JSON
ops@slave-1:~ $ ssh-keygen -t rsa
```
copy it to the other server as such
```JSON
ops@slave-1:~ $ ssh-copy-id ops@slave-2
```

/usr/bin/keychain $HOME/.ssh/id_rsa
source $HOME/.keychain/$HOSTNAME-sh

# Mounting storage

### In the master-node server
```JSON
pi@master-node:~ $ sudo mkdir /nfs
pi@master-node:~ $ sudo chown ops:ops /nfs
pi@master-node:~ $ sudo update-rc.d rpcbind enable
```

```JSON
pi@master-node:~ $ sudo vim /etc/exports
# nfs-storage
/nfs 192.168.1.0/24(rw,sync)
```
Restart the NFS server
```JSON
pi@master-node:~ $ sudo service nfs-kernel-server restart

```

### in the client's
```JSON
sudo mount master-node:/nfs /nfs
```
