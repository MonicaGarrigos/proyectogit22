const fs = require('fs');
//express.js
const express = require('express');
const app = express();
//socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var args = process.argv.slice(2);

const PORT = process.env.PORT || 3001;
const modelo = require("./servidor/modelo.js");
const sWS = require("./servidor/servidorWS.js");

let juego = new modelo.Juego(args[0]);
let servidorWS = new sWS.ServidorWS();


app.use(express.static(__dirname + "/"));

app.get("/", function (request, response) {
  let contenido = fs.readFileSync(__dirname + "/cliente/index.html");
  response.setHeader("Content-type", "text/html");
  response.send(contenido);
});

app.get("/agregarUsuario/:nick", function (request, response) {
  let nick = request.params.nick;
  let res;
  res = juego.agregarUsuario(nick);
  response.send(res);
});

app.get("/comprobarUsuario/:nick", function (request, response) {
  let nick = request.params.nick;
  let us = juego.obtenerUsuario(nick);
  let res = { "nick": -1 };
  if (us) {
    res.nick = us.nick;
  }
  response.send(res);
})

app.get("/crearPartida/:nick", function (request, response) {
  let nick = request.params.nick;
  let res = juego.jugadorCreaPartida(nick);

  response.send(res);
});

app.get("/unirseAPartida/:nick/:codigo", function (request, response) {
  let nick = request.params.nick;
  let codigo = request.params.codigo;
  let res = juego.jugadorSeUneAPartida(nick, codigo)
  response.send(res);
})

app.get("/obtenerPartidas", function (request, response) {

  let lista = juego.obtenerPartidas();

  response.send(lista);
})

app.get("/obtenerPartidasDisponibles", function (request, response) {

  let lista = juego.obtenerPartidasDisponibles();

  response.send(lista);
})

app.get("/obtenerLogs", function (request, response) {
  juego.obtenerLogs(function(logs){
    response.send(logs);
  })
})

app.get("/salir/:nick", function (request, response) {

  let nick = request.params.nick;

  juego.usuarioSale(nick);

  response.send({ res: "ok" });
})

// Start the server, antes con app, ahora con sockets con server.listen
/*app.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
  console.log('Press Ctrl+C para salir.');
});*/

server.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
  console.log('Press Ctrl+C para salir.');
});
// [END gae_flex_quickstart]

//lanzar servidor
servidorWS.lanzarServidorWS(io, juego);