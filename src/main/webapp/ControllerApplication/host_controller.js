/* global screen */
var robot = require('robotjs');
var vkey = require('vkey');

var WebSocketServer = require('ws').Server;

var PORT = 8007;

var wss = new WebSocketServer({port: PORT});

var messages = [];

function scale (x, fromLow, fromHigh, toLow, toHigh) {
  console.log("scaling ", x,fromLow,fromHigh,toLow,toHigh);
  return (x - fromLow)  * (toHigh - toLow) / (fromHigh - fromLow) + toLow
}

wss.on('connection',function(ws) {
	console.log( "connection received ", ws );
/*
ws.on('message', function (message) {
    messages.push(message);
    console.log('Message Received: %s', message);
    wss.clients.forEach(function (conn) {
      conn.send(message);
    });
  });
*/
ws.on('message', function (msg){
  console.log("msg received ",msg );
  var data;
  data=JSON.parse(msg);
  var screensize = robot.getScreenSize();
  console.log("Myscreensize ", screensize );
    var pos = robot.getMousePos(); // hosts current x/y
    console.log("Mousepos ", pos );
  if (data.click) {
    var x = scale( (data.clientX),0,(data.canvasWidth),0, (screensize.width));
    var canvasHeight = Math.round(data.canvasHeight);
    console.log("canvasHeight ",canvasHeight);
    Yoffset= (data.offsetHeight - canvasHeight)/2;
    console.log(" Yoffset",Yoffset);
    var y = scale(data.clientY - Yoffset, 0, (canvasHeight),0, (screensize.height));
    console.log("Normalized x",x ,"y",y);
    var pos = robot.getMousePos(); // hosts current x/y
    robot.moveMouse(Math.round(x), Math.round(y)); // move to remotes pos
    robot.mouseToggle('up', 'left'); // set mouse position to up
    robot.mouseClick(); // click on remote click spot
    //robot.moveMouse(pos.x, pos.y); // go back to hosts position
  }

  if (data.keyCode) {
    var k = vkey[data.keyCode].toLowerCase()
    if (k === '<space>') k = ' '
    var modifiers = []
    if (data.shift) modifiers.push('shift')
    if (data.control) modifiers.push('control')
    if (data.alt) modifiers.push('alt')
    if (data.meta) modifiers.push('command')
    if (k[0] !== '<') {
      console.log('typed ' + k + ' ' + JSON.stringify(modifiers))
      if (modifiers[0]) robot.keyTap(k, modifiers[0])
      else robot.keyTap(k)
    } else {
	console.log("k is ", k);
      if (k === '<enter>') robot.keyTap('enter')
      else if (k === '<backspace>') robot.keyTap('backspace')
      else if (k === '<up>') robot.keyTap('up')
      else if (k === '<down>') robot.keyTap('down')
      else if (k === '<left>') robot.keyTap('left')
      else if (k === '<right>') robot.keyTap('right')
      else if (k === '<delete>') robot.keyTap('delete')
      else if (k === '<home>') robot.keyTap('home')
      else if (k === '<end>') robot.keyTap('end')
      else if (k === '<page-up>') robot.keyTap('pageup')
      else if (k === '<page-down>') robot.keyTap('pagedown')
      else console.log('did not type ' + k)
    }
  }
});
});


