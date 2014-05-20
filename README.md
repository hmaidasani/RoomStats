# RoomStats
An app that takes a webcam shot periodically and finds the number of people in the image.

## Requirements
1. npm and node.js
2. bower
3. dropbox account or other cloud storage for webcam image
4. faceplusplus mashape-key from mashape (https://www.mashape.com/faceplusplus/faceplusplus-face-detection#!endpoint-Face-Detection)
5. add dropbox (or equivalent) username and userid and mashape-key to app.js

## Workflow
The is node.js server runs locally on the machine with the webcam.
Once the client is connected, websockets are used to communicate data.
The server uses imagesnap to take a photo from the webcam. Next, it moves this captured photo to dropbox (or equivalent). Next, it calls the faceplusplus api with the dropbox public url to the image. 
The api returns a json object with the face details. We use this count of faces and send this to the client. Also, sends historical data.

## How to run
After obtaining above requirements, run following commands to start the server:
`npm install`
`bower install`
`node app.js`
