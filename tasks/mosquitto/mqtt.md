Reference: https://appcodelabs.com/introduction-to-iot-build-an-mqtt-server-using-raspberry-pi

#### Testing on single Pi

1. Install (On Raspberry Pi)

```
$ sudo apt install mosquitto mosquitto-clients
```

2. Enable mosquitto broker

```
$ sudo systemctl enable mosquitto
$ sudo systemctl status mosquitto
● mosquitto.service - LSB: mosquitto MQTT v3.1 message broker
   Loaded: loaded (/etc/init.d/mosquitto; generated; vendor preset: enabled)
   Active: active (running) since Sun 2019-07-14 12:30:44 PDT; 22s ago
     Docs: man:systemd-sysv-generator(8)
      CPU: 19ms
   CGroup: /system.slice/mosquitto.service
           └─29398 /usr/sbin/mosquitto -c /etc/mosquitto/mosquitto.conf

Jul 14 12:30:44 cherrypi systemd[1]: Starting LSB: mosquitto MQTT v3.1 message broker...
Jul 14 12:30:44 cherrypi mosquitto[29392]: Starting network daemon:: mosquitto.
Jul 14 12:30:44 cherrypi systemd[1]: Started LSB: mosquitto MQTT v3.1 message broker.
```

3. Subscribing to MQTT topic locally

```
$ mosquitto_sub -h localhost -t "test/message"
```

4. Publish to the MQTT topic locally

   In another terminal on the same Pi

```
$ mosquitto_pub -h localhost -t "test/message" -m "Hello, world"
```



#### Testing on multiple Pis

1. Install client on other Pi(s)

```
$ sudo apt intall mosquitto-clients
```

2. Subscribe to the topic remotely

```
mosquitto_sub -h 10.0.0.18 -t "test/message"
```

Note: -h will be the ip address to the mosquitto server

3. Publish a message from server

```
mosquitto_pub -h localhost -t "test/message" -m "Hello, world 2"
```

4.  Publish a message remotely

```
mosquitto_pub -h 10.0.0.18 -t "test/message" -m "Remote machine saying hello"
```

All pi's that are subscribed will receive the message "Remote machine saying hello"