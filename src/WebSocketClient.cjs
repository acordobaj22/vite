const WebSocket = require('ws');

const access_token = 'vn4HigAAAA11czEubG9yaW90LmlvGXEL1IAdq4R1ZW94I1fl8g==';


let dataTemporal = [];
let dataTotal = [];


function consumeWS(page = 1) {
  const perPage = 100;

  const dataRequest = {
    cmd: 'cq',
    filter: {
      from: '1684628400238',
      EUI: '4768C40A00260021',
    },
    perPage: perPage,
    page: page.toString(),
  };

  function on_message(message) {
    message = JSON.parse(message);
    if (message.cmd === 'cq') {
      if (page === 1) {
        dataTemporal = message.cache;
      } else {
        dataTemporal = dataTemporal.concat(message.cache);
      }
      console.log(dataTemporal[0])
    }
  }

  function on_error(error) {
    console.log(error);
  }

  function on_close() {
    console.log('Connection closed');
  }

  function on_open() {
    console.log('Connection established');
    ws.send(JSON.stringify(dataRequest));
  }

  const ws_url = `wss://us1.loriot.io/app?token=${access_token}`;
  const ws = new WebSocket(ws_url);

  ws.on('message', on_message);
  ws.on('error', on_error);
  ws.on('close', on_close);
  ws.on('open', on_open);
}

consumeWS();
