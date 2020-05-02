const http = require('http');
const url = require('url');

const server = http.createServer();

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

const getAllMessages = (response) => {
  const body = JSON.stringify(messages);
  response.writeHead(200,{
   'Content-Length': Buffer.byteLength(body),
   'Content-Type':'text/plain'
    
  }).end(body)
}
const addMessage = (newMessage,response) => {
  messages.push(newMessage);

  const body = JSON.stringify(newMessage);
  response.writeHead(201,{
   'Content-Length': Buffer.byteLength(body),
   'statusMessage' : 'Message was added successfully',
   'Content-Type':'text/plain'
    
  }).end(body)
}

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});