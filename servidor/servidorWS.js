function ServidorWS() {

    //ZONA de enviar peticiones al cliente
    this.enviarAlRemitente = function (socket, mensaje, datos) { //Para contestar solo al que hace la peticion, abra otros de broadcast
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
                let res = juego.jugadorCreaPartida(nick);
                let codigoStr = res.codigo.toString();
                socket.join(codigoStr);

                //cli.enviarAlRemitente(socket, "partidaCreada", res) //le va a enviar el objeto de respuesta (res)
                cli.enviarATodosEnPartida(io, codigoStr, "partidaCreada", res)
                let lista = juego.obtenerPartidasDisponibles();
                cli.enviarATodos(socket, "actualizarListaPartidas", lista);
            });

            socket.on("unirseAPartida", function (nick, codigo) {

                let codigoStr = codigo.toString();
                socket.join(codigoStr);
                let res = juego.jugadorSeUneAPartida(nick, codigo);
                cli.enviarAlRemitente(socket, "unidoAPartida", res);
                let partida = juego.obtenerPartida(codigo);
                //if (partida.esJugando()) {
                //    cli.enviarATodosEnPartida(io, codigoStr, "aJugar", {});
                //}
                if (partida.esDesplegando()) {
                    let us = juego.obtenerUsuario(nick);
                    let flota = us.obtenerFlota();
                    console.log(flota);
                    let res = {};
                    res.flota = flota;
                    cli.enviarATodosEnPartida(io, codigoStr, "faseDesplegando", res);
                }

            });

            socket.on("abandonarPartida", function (nick, codigo) { //por hacer
                let jugador = juego.obtenerUsuario(nick);
                let partida = juego.obtenerPartida(codigo)

                let codigoStr = codigo.toString();
                if (jugador && partida) {
                    let rival = partida.obtenerRival(jugador.nick);
                    if (rival == undefined) {
                        cli.enviarAlRemitente(socket, "partidaCancelada", { codigoP: codigo })
                        partida.abandonarPartida(jugador)
                    }
                    else {
                        let res = { codigoP: codigo, nombreA: jugador.nick, nombreG: rival.nick }
                        partida.abandonarPartida(jugador)
                        //cli.enviarAlRemitente(socket, "partidaAbandonada", res);
                        cli.enviarATodosEnPartida(io, codigoStr, "partidaAbandonada", res);
                        socket.leave(codigoStr)
                    }

                }
            });

            socket.on("colocarBarco", function (nick, nombre, x, y) {
                let jugador = juego.obtenerUsuario(nick);
                if (jugador) {
                    console.log(nombre);
                    jugador.colocarBarco(nombre, x, y)
                    //let desplegado = jugador.obtenerBarcoDesplegado(nombre, x)
                    //console.log(desplegado)
                    let res = { barco: nombre, x: x, y: y, colocado: true }
                    cli.enviarAlRemitente(socket, "barcoColocado", res);
                }
            });

            socket.on("barcosDesplegados", function (nick) {
                let jugador = juego.obtenerUsuario(nick);

                if (jugador.barcosDesplegados()) {
                    let partida = jugador.partida;
                    if (partida.flotasDesplegadas()) {
                        let res = { fase: partida.fase, turno: partida.turno.nick };
                        let codigoStr = partida.codigo.toString();

                        if (partida.esJugando()) {
                            cli.enviarATodosEnPartida(io, codigoStr, "aJugar", {});
                        }
                    }


                }
            });

            socket.on("disparar", function (nick, x, y) {
                let jugador = juego.obtenerUsuario(nick);
                let res = { "jugador": nick, "disparoX": x, "disparoY": y }

                let partida = jugador.partida;
                //let rival=partida.obtenerRival(nick);
                let turno = partida.turno;

                if (jugador.nick == turno) {
                    //console.log("Si es tu turno,socket")
                    let impacto = jugador.disparar(x, y)
                    console.log(impacto, "ServSo")
                    //let impacto = rival.meDisparan(x, y);
                    let codigoStr = partida.codigo.toString();
                    if (partida.esFinal()) {
                        cli.enviarATodosEnPartida(io, partida.codigo.toString(), "finalPartida", jugador.nick);
                    }

                    let res2 = { atacante: jugador.nick, impacto: impacto, x: x, y: y, turno: turno.nick }
                    cli.enviarATodosEnPartida(io, codigoStr, "disparo", res2);
                }
                else {
                    //console.log("No es tu turno,socket")
                    cli.enviarAlRemitente(socket, "noEsTuTurno", res);
                }

            });

        });
    }
}
module.exports.ServidorWS = ServidorWS;