function ServidorWS() {

    //ZONA de enviar peticiones al cliente
    this.enviarAlRemitente = function (socket, mensaje, datos) {
        socket.emit(mensaje, datos);
    }
    this.enviarATodosEnPartida = function (io, codigo, mensaje, datos) {
        io.sockets.in(codigo).emit(mensaje, datos)
    }
    this.enviarATodos = function (socket, mens, datos) {
        socket.broadcast.emit(mens, datos);
    }


    //ZONA de gestionar peticiones
    this.lanzarServidorWS = function (io, juego) {
        let cli = this;
        io.on('connection', (socket) => {
            console.log('Usuario conectado');

            socket.on("crearPartida", function (nick) {  //tiene la misma cadena que el clienteWS
                let res = juego.jugadorCrearPartida(nick);
                let codigoStr=res.codigo.toString();
                socket.join(codigoStr);
                cli.enviarAlRemitente(socket, "partidaCreada", res) //le va a enviar el objeto de respuesta (res)
                let lista=juego.obtenerPartidasDisponibles();
                cli.enviarATodos(socket,"actualizarListaPartidas",lista);
            });

            socket.on("unirseAPartida", function (nick, codigo) {
                let res = juego.jugadorSeUneAPartida(nick, codigo);
                let codigoStr=res.codigo.toString();
                socket.join(codigoStr);
                cli.enviarAlRemitente(socket, "unidoAPartida", res);
                let partida = juego.obtenerPartida(codigo);
                if (partida.esJugando()) {
                    cli.enviarATodosEnPartida(io, codigo, "aJugar", {});
                }

            });

        });
    }

}
module.exports.ServidorWS = ServidorWS;