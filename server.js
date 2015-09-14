import express from 'express';
import path from 'path';
import socketIO from 'socket.io';
import { Server } from 'http';

import * as predb from './lib/predb';

const app = express(),
    server = Server(app),
    io = socketIO(server),
    host = 'localhost',
    port = '3000';

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset='UTF-8' />
        <title>gaxx</title>
        <link rel='stylesheet' href='style.css'>
      </head>
      <body>
        <div id='root'></div>
        <script src='bundle.js'></script>
      </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log('Listening at http://%s:%s', host, port);

  io.on('connection', socket => {
    const data = predb.getReleaseCache();
    if (data) io.emit('update', data, true);
  });

  predb.get(err => {
    if (err) return console.log(err);

    /*
     * TODO Handle termination if getNew errors
     */
    setInterval(() => {
      predb.getNew((err, data) => {
        if (err) console.log(err);
        if (data) io.emit('update', data, true);
      });
    }, 10000);
  });
});
