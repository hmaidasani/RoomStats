exports.sendData = function(is){
  var imagesnap = require('imagesnap');
  var fs = require('fs');
  var imageStream = fs.createWriteStream('capture.jpg');
  imagesnap().pipe(imageStream);
  
  var mv = require('mv');

  mv('capture.jpg', '/Users/hmaidasani/Dropbox/Public/capture.jpg', function(err) {
      console.log("error");
  });

  var unirest = require('unirest');
  var url = 'https://dl.dropboxusercontent.com/u/13744445/capture.jpg';
  var Request = unirest.get("https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?url=" +url)
    .headers({ 
      "X-Mashape-Authorization": "6ut2uG9jR0uSFsMR0kOjlXk2om87R8ZK"
    })
    .end(function (response) {
      console.log(response.body.face);
      return response.body.face.length ;
    });
  return 0;
};