# websocket basics

Basic implementation of using a browser window to connect with another browser window through web sockets

Uses express node-server in combination with socket.io.

## Getting started

Make sure you have [_node.js_](https://nodejs.org/en/) installed.

### Install socket library

In the root _src_ directory (the same directory where this readme.md is located), install the socket library:
````
npm install
````

### Start the socket-server:
````
node socket.io-server.js
````

(or double click the batch script _START-SOCKET.IO-SERVER_, which executes the same command)

You'll now have a webserver running on http://localhost:3000. The socket-server serves files in the _public_ directory and handles traffic between sockets. Sockets can send events to the socket-server, and the socket-server sends some of its own events to the sockets. A very basic example chat application is included in the repo; check it at http://localhost:3000/chat-example.html.

### Add scripts to html

At the end of every html page you want to work as a socket client, include the [_socket.io_](https://socket.io/) library and the hub-proxy:
````html
<script src="/socket.io/socket.io.js"></script>
<script src="js/socket.io-hub-proxy.js"></script>
````

### Create javascript functionality

For your own page functionality, you can use _js/template.js_ as a starting point. It should be included after the two aforementioned scripts.

Check if the hubProxy is ready before initializing your functionality:
````javascript
if (window.hubProxy && window.hubProxy.isReady) {
    init();
} else {
    body.addEventListener('hubready.hub', init);
}
````

You can make the script send events to all clients (including the script itself)
````javascript
const data = {foo: bar};
window.hubProxy.sendEventToClients('someEventName', data);
````
This sends an event to the socket server, which then sends it back to all socket clients

To make a script listen to that event:
````javascript
body.addEventListener('someEventName.hub', (evt) => {
    console.log('event data:', evt.detail);
}));
````

# Below this point, documentation may be old or incorrect - I've left it in to edit later :)

## Detailed explanation

At the heart is a node-based webserver _socket.io-server_ which can handle the communication between different browser instances using sockets.

### Passing custom events around

The socket server only handles basic stuff like joining and disconnecting. We do not want to make changes to the server's code for every type of event our app needs to pass around. Therefore I have created a special type of event: the _passthrough_ event.

Any script can send a passthrough event to the socket server:
````
var data = {
    eventName: 'someeventname',
    eventData: {foo: 'bar'}
};
io.emit('passthrough', data);
````
The socket server then sends an event with the event name and the data to all sockets.


### More control: Rooms and Users
Every page that includes _socket.io-hub-proxy.js_ can communicate with other socket clients.
Often, this will be just fine. There is also a more refined way, using the concept of _rooms_. This allows a bit more control: all clients are already present in the environment, but you can let each client join a _room_ as a _user_. This way, you can also communicate to only the joined _users_, and you'll be notified when a _user_ leaves a _room_. The server only caters for 1 room at the moment. I've never needed more.

Since I want this repo to be a simple, basic implementation, I've not included any code for this in the frontend implementation. However, the _socket.io-server.js_ does already include event listeners (like ``socket.on('join', ...)`` and functions for this (like ``joinHandler``). This has been implemented in one of my other projects: https://github.com/jaronbarends/websocket-positions

### Communication between browser instances

Every browser instance (i.e. page) has connect to the socket server and to _join_ the room before it can communicate with others. You need to do this in one script on every page.

To join the room, a page sends a join-event to io, together with a _user_-object with some info that might be of interest to other users in the room.
````
var user = {
    role: 'remote',
    id: io.id,
};
io.emit('join', user);
````

When a page joins the room, the socket server pushes the new user's user object into an array, sends a _joined_-event to the newly joined user, and a _newuser_-event to all other users of the room, both with an array containing all users.

## File structure

The root folder contains the node-server (_socket.io-server.js_) and the npm stuff. Everything in the folder _public_ can be served by the node-server.

## Javascript modules

The functionalities have been seperated as much as possible into different javascript files to prepare for re-use.

### socket.io-server.js

This is the server you run to serve the pages: `node socket.io-server`
Or double click the batch file _START-SOCKET.IO-SERVER.bat_ (this is just a file containing the command `node socket.io-server`)

The socket-server serves files in the _public_ directory and handles traffic between sockets. Sockets can send events to the socket-server, and the socket-server sends some of its own events to the sockets.

#### Events socket.io-server.js listens for
* `disconnect` Sent by socket.io when user disconnects
* `join` Sent by clients when they want to join the room
* `updateusers` Sent by clients when the users of the room change
* `passthrough` Sent by clients to pass an event to all clients

#### Events socket.io-server.js sends
* `connectionready` Sent when socket has established a connection. Listened for by _connection-init.js_, which then sends a `connectionready.socket` event

### socket.io.js

External library for handling websockets

### public/js/socket.io-hub-proxy.js

Creates a websocket, and lets the `document` trigger an event `connectionready.socket`. Other scripts can listen for that event, and initialize themselves.

### hub-page.js


### remote-page.js








## Troubleshooting

python needs ms Visual Studio. Default is 2010, but you'll have to adjust this to your own version: 
 npm install --save socket.io --msvs_version=2013
this line can be  put into package.json under "scripts"
