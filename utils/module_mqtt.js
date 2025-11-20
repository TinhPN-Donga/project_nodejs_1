const mqtt = require('mqtt');

const serverUri = 'mqtts://broker.donga.edu.vn'; // Note the 'mqtts' for secure connection
const clientId = 'mqttx_739a35d45';
const topics = ['TOPIC-UDA/Device/Content/demo-device-2/afcbc25d',];
const username = 'UDA-APP';
const password = 'Vc0nn3x@xZcevKa';
const port = 1884;
const secure = true; 

const options = {
  clientId: clientId,
  username: username,
  password: password,
  port: port,
  clean: true, 
  rejectUnauthorized: secure, 
};

// Create an MQTT client instance
const client = mqtt.connect(serverUri, options);
let lastMessage = '';

function onConnect(callback) {
  console.log('hihi');
  // Handle connection events
  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    // Subscribe to the desired topic
    client.subscribe(topics);
  });

  // Handle incoming messages
  client.on('message', (topic, message) => {
    lastMessage = message.toString();
    callback(message);
    // client.publish(topics[0],"Hello World!!!");
  });
}

function publishMessage(topic, message) {
  client.publish(topic, message);
}

function end(){
  client.end();
}

client.publish('TOPIC-UDA/Device/Content/demo-device-2/afcbc25d', 'test');


module.exports = {
  getLastMessage: () => lastMessage,
  publishMessage,
  onConnect,
  topics,
  end,
  client
};
