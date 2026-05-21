const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const WebSocket = require('ws');

const app = express();

const server = app.listen(3001, () => {
    console.log("Backend running on port 3001");
});


// SERIAL PORT

const port = new SerialPort({
    path: 'COM6', // CHANGE THIS
    baudRate: 115200,
});

const parser = port.pipe(new ReadlineParser({
    delimiter: '\n'
}));


// WEBSOCKET SERVER

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Website connected');
});


// SERIAL DATA FROM ESP32

parser.on('data', (data) => {

    console.log("ESP32:", data);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
});