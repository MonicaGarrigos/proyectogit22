function ServidorWS() {

    //ZONA de enviar peticiones al cliente
    this.enviarAlRemitente = function (socket, mensaje, datos) {
        socket.emit(mensaje, datos);
    }
    this.enviarATodosEnPartida=function(io,codigo,mensaje,datos){
		io.sockets.in(codigo).emit(mensaje,datos)
	}



    //ZONA de gestionar peticiones
    this.lanzarServidorWS = function (io, juego) {
        let cli=this;
        io.on('connection', (socket) => {
            console.log('Usuario conectado');

            socket.on("crearPartida", function (nick) {  //tiene la misma cadena que el clienteWS
                let res = juego.jugadorCrearPartida(nick);
                cli.enviarAlRemitente(socket, "partidaCreada", res ) //le va a enviar el objeto de respuesta (res)
            });

            socket.on("unirseAPartida", function (nick,codigo) {  
                let res = juego.jugadorSeUneAPartida(nick,codigo);
                cli.enviarAlRemitente(socket, "unidoAPartida", res );

                socket.join(codigo);
                let partida=juego.obtenerPartida(codigo);
                if(partida.fase.esJuando()){
                    cli.enviarATodosEnPartida(io,codigo,"aJugar", {});
                }
             
            });

        });
    }

}
module.exports.ServidorWS = ServidorWS;