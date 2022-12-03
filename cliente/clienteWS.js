function ClienteWS() {

    this.socket;
    this.codigo;

    //ZONA de enviar peticiones al cliente
    this.conectar = function () {
        this.socket = io(); //poner en marcha los socket
        this.servidorWS(); //En el momento que mando la peticion de conexion, me pongo a escuchar
    }

    this.crearPartida = function () { //Esto lo enviara al servidorWS, que lo recoge en un bloque "socket.on"
        this.socket.emit("crearPartida", rest.nick);  //el atributo nick lo tenemos en el cliente Rest 
        //Emit para enviar peticiones+una cadena y el atributo
    }

    this.unirseAPartida = function () {
        this.socket.emit("unirseAPartida", rest.nick, codigo);
    }

    this.abandonarPartida = function () {
        this.socket.emit("unirseAPartida", rest.nick, cws.codigo);
    }
    this.salir=function(){
		this.socket.emit("usuarioSale",rest.nick,cws.codigo);
	}
    this.colocarBarco = function (nombre, x, y) {
        this.socket.emit("colocarBarco", rest.nick, nombre, x, y)
    }

    this.barcosDesplegados = function () {
        this.socket.emit("barcosDesplegados", rest.nick)
    }

    this.disparar = function (x, y) {
        this.socket.emit("disparar", rest.nick, x, y)
    }


    //ZONA de gestionar peticiones
    this.servidorWS = function () {
        let cli = this; //Esto lo hacemos por js para no confundir el this con tantos callbacks

        this.socket.on("partidaCreada", function (data) {
            console.log(data);
            if (data.codigo != -1) {
                console.log("Usuario: " + rest.nick + " crea partida con el código: " + data.codigo);
                iu.mostrarCodigo(data.codigo);
                cli.codigo = data.codigo;

            }
            else {
                console.log("No se ha podido crear partida");
                iu.mostrarModal("No se ha podido crear partida");
                //iu.mostrarCrearPartida();
                rest.comprobarUsuario();
            }
        });

        this.socket.on("unidoAPartida", function (data) {
            if (data.codigo != -1) {
                console.log("Usuario " + rest.nick + " se une a partida codigo: " + data.codigo);
                iu.mostrarCodigo(data.codigo);
                cli.codigo = data.codigo;
            }
            else {
                console.log("No se ha podido unir a partida")

            }
        });

        this.socket.on("actualizarListaPartidas", function (lista) {
            if (!cli.codigo) {
                iu.mostrarListaPartidasDisponibles(lista);
            }
        });

        /*this.socket.on("unirseAPartida", function (data) {
            console.log(data);
            if (data.codigo != -1) {
                console.log("Usuario" + nick + "se une a partida codigo" + data.codigo);
                iu.mostrarCodigo(data.codigo);
                cli.codigo = data.codigo;
            }
            else {
                console.log("No se ha podido unir a partida");
            }
        });
*/
        this.socket.on("partidaAbandonada", function (data) {
            if (data.codigo != -1) {
                console.log(data.nombreA + " ha abandonado la partida con codigo: " + data.codigoP + "\n" + " Ha ganado " + data.nombreG)
                iu.mostrarHome();
                iu.mostrarModal(data.nombreA + " ha abandonado la partida con codigo: " + data.codigoP + "\n" + " Ha ganado " + data.nombreG);
            }
            else {
                console.log("No se ha podido abandonar la partida");
                iu.mostrarModal(data.nombreA + " ha intentado abandonar la partida pero no ha podido");
            }
        });


        this.socket.on("aJugar", function () {
            iu.mostrarModal("A jugaaar!");
        });

        this.socket.on("aJugar",function(res){
			if (res.fase=="jugando"){
				console.log("A jugar, le toca a: "+res.turno);
			}
		});


        this.socket.on("jugadorAbandona",function(data){
			iu.mostrarModal("Jugador "+data.nick+" abandona");
			iu.finPartida();
		});

        this.socket.on("barcoColocado", function (res) {
            console.log("Barco "+res.barco+" colocado?: "+res.colocado);
			let barco=tablero.flota[res.barco];
            
			if (res.colocado){
				tablero.terminarDeColocarBarco(barco,res.x,res.y);
				cli.barcosDesplegados();
			}
			else{
				iu.mostrarModal("No se puede colocar barco");
			}
        })

        // this.socket.on("esperandoRival",function(){
		// 	console.log("Esperando rival");
		// })


        this.socket.on("disparo", function (res) {
            console.log(res.impacto)
            console.log("Turno: "+res.turno);
            if (res.atacante == rest.nick) {
                tablero.updateCell(res.x, res.y, res.impacto, 'computer-player');
            }
            else {
                tablero.updateCell(res.x, res.y, res.impacto, 'human-player');
            }
        });
        this.socket.on("info",function(info){
			console.log(info);
		});

        this.socket.on("partidaTerminada", function () {
            iu.mostrarModal("La partida ha terminado");
        });

        this.socket.on("noEsTuTurno", function (data) {
            iu.mostrarModal("No puedes disparar no es tu turno");
        });

        this.socket.on("faseDesplegando", function (data) {
            //tablero.mostrarTablero(true)
            tablero.flota = data.flota;
            tablero.elementosGrid();
            tablero.mostrarFlota(); //data.flota();
            console.log("Ya puedes desplegar la flota");
        });

        this.socket.on("finalPartida", function (res) {
            console.log("Fin de la partida");
            iu.mostrarModal(res.turno + ' ha ganado la partida!!');
            iu.mostrarModal("Fin de la partida. Ganador: "+res.turno);
			
            iu.finalPartida()
        });

    }
}
