/*
    author : daotrancong@vccorp.vn
*/

var sys = require('sys');
var net = require('net');
var mqtt = require('mqtt');
 
// create a socket object that listens on port 5000
var io = require('socket.io').listen(5000);
 
// create an mqtt client object and connect to the mqtt broker
var url = "mqtt://123.31.11.237:1883";

var options = {
    clientId: 'admin_notify',
    username: '',
    password: '',
};

var client = mqtt.connect(url, options);

io.sockets.on('connection', function (socket) {

    // socket connection indicates what mqtt topic to subscribe to in data.topic

    socket.on('subscribe', function (data) {
        socket.join(data.topic);
        client.subscribe(data.topic);
    });

    // when socket connection publishes a message, forward that message
    // the the mqtt broker
    socket.on('publish', function (data) {

        console.log('Publishing to '+data.topic);
        client.publish(data.topic,  JSON.stringify(data));
        client.publish('tracklog',  JSON.stringify(data));

    });
});
 
// listen to messages coming from the mqtt broker
client.on('message', function (topic, message, packet) {
    
    var json = message.toString();
    if(json == 'Hello world!')
        console.log('hh');
    else
        json =  JSON.parse(message);

    console.log('data', json);

    io.sockets.emit('mqtt',{'topic':String(json.topic),
                            'content':String(json.content),
                            'username' : String(json.username)
                        });
});