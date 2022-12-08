let modelo = require("./modelo.js");

describe("El juego...", function () {
    var miJuego;
    var usr1, usr2, partida;

    beforeEach(function () {  //lo que pones en el beforeEach se ejecuta siempre antes de cada it -- cada comprobacion es independiente
        miJuego = new modelo.Juego(true);

        // 1) Agregar el usuario
        // 2) El usuario crea la partida
        // 3) El usuario se une a la partida

        miJuego.agregarUsuario("pepe");
        let res = miJuego.jugadorCreaPartida("pepe");
        usr1 = miJuego.obtenerUsuario("pepe"); //código usr

        miJuego.agregarUsuario("luis");
        miJuego.jugadorSeUneAPartida("luis", res.codigo);
        usr2 = miJuego.obtenerUsuario("luis"); //código usr

        partida = miJuego.obtenerPartida(res.codigo);

    });

    it("Comprobar valores iniciales del juego - hemos creado correctamente los jugadores", function () {
        //El nombre de usuario es el que hemos implementado
        expect(usr1.nick).toEqual("pepe");
        expect(usr2.nick).toEqual("luis");
    });


    it("luis y pepe están en la partida", function () {
        expect(partida.estoy("pepe")).toEqual(true);
        expect(partida.estoy("luis")).toEqual(true);
    });


    it("Cada usuario tiene 2 tableros de 5x5, tablero propio y rival", function () {
        expect(usr1.tableroPropio).toBeDefined();
        expect(usr2.tableroPropio).toBeDefined();

        expect(usr1.tableroRival).toBeDefined();
        expect(usr2.tableroRival).toBeDefined();

        expect(usr1.tableroPropio.casillas.length).toEqual(10);
        expect(usr2.tableroPropio.casillas.length).toEqual(10);

        //habria que recorrer las 5 columnas
        for (x = 0; x < 5; x++) {
            expect(usr1.tableroPropio.casillas[x].length).toEqual(10);
        }
        //expect(usr2.tableroPropio.casillas[0].length).toEqual(5);

        //habria que recorrer todo el tablero
        for (x = 0; x < 10; x++) { //usr1.tableroPropio.casillas.length
            for (y = 0; y < 10; y++) {//usr1.tableroPropio.casillas[x].length
                expect(usr1.tableroPropio.casillas[x][y].contiene.nombre).toEqual("agua");
            }
        }

    });


    it("los dos jugadores tienen flota (2 barcos, tam 1 y 2)", function () {
        expect(usr1.flota).toBeDefined();
        expect(usr2.flota).toBeDefined();

        //expect(usr1.flota.length).toEqual(2);  //da fallo porq es un array asociativo
        expect(Object.keys(usr1.flota).length).toEqual(2); //seria asi
        expect(Object.keys(usr2.flota).length).toEqual(2)

        //expect(usr1.flota[0].tam).toEqual(2); //aqui igual
        expect(usr1.flota["b1"].tam).toEqual(1);
        expect(usr1.flota["b2"].tam).toEqual(2);
    });


    it("La partida esta en fase desplegando", function () {
        expect(partida.esJugando()).toEqual(false);
        expect(partida.esDesplegando()).toEqual(true);
    });


    describe("Barcos fuera de limites", function () {
        beforeEach(function () {
            //El usuario 1 coloca sus barcos b1 y b2 (barco, x, y)
            usr1.colocarBarco("b1", 9, 9); // no cabe
            usr1.colocarBarco("b2", 9, 7); // no cabe
            usr1.barcosDesplegados();

            usr2.colocarBarco("b1", 7, 7);// Este si deberia el resto no 7,7 8,7
            usr2.colocarBarco("b2", 9, 9);// no cabe
            usr2.barcosDesplegados();
        });

    });


    describe("A jugar!", function () {
        beforeEach(function () { //Como esta anidado, el beforeEach de arriba tambien se hace
            usr1.colocarBarco("b1", 0, 0); // 0,0 1,0
            usr1.colocarBarco("b2", 0, 1); // 0,1 1,1 2,1 3,1
            usr1.barcosDesplegados();
            usr2.colocarBarco("b1", 3, 3);// 3,3 4,3
            usr2.colocarBarco("b2", 4, 4);// 4,4 5,4 6,4 7,4
            usr2.barcosDesplegados();
        });
        
      

        it("Comprobar que las flotas estan desplegadas", function () { //metodos todosDesplegados...
            expect(usr1.todosDesplegados()).toEqual(true);
            expect(usr2.todosDesplegados()).toEqual(true);
        });


        it("Comprobar jugada que el jugador Pepe gana", function () {
            expect(partida.turno.nick).toEqual("pepe");
            expect(usr2.flota["b1"].obtenerEstado()).toEqual("intacto");
            expect(usr2.flota["b2"].obtenerEstado()).toEqual("intacto");
            usr1.disparar(3, 3);
            expect(usr2.flota["b1"].obtenerEstado()).toEqual("hundido");
            usr1.disparar(4, 4);
            expect(usr2.flota["b1"].obtenerEstado()).toEqual("hundido");
            expect(usr2.flota["b2"].obtenerEstado()).toEqual("tocado");
            usr1.disparar(5, 4);
            expect(usr2.flota["b2"].obtenerEstado()).toEqual("hundido");
            //usr1.disparar(5, 4);
            //usr1.disparar(6, 4);
            //usr1.disparar(7, 4);
            expect(usr2.flota["b2"].obtenerEstado()).toEqual("hundido");
            expect(usr2.flotaHundida()).toEqual(true);
            expect(usr1.flotaHundida()).toEqual(false);



        });


        it("Comprobar el cambio de turno",function(){ //Comprobar también que no cambia de turno si acierta
            expect(partida.turno.nick).toEqual(usr1.nick);
            usr1.disparar(2,2);
            expect(partida.turno.nick).toEqual(usr2.nick);
      
      
          });


          it("Comprobar que no deja disparar si no es tu turno",function(){
            expect(partida.turno).toEqual(usr1);
            expect(usr1.flota["b1"].obtenerEstado()).toEqual("intacto");
            usr2.disparar(0,0);
            expect(usr1.flota["b1"].obtenerEstado()).toEqual("intacto");
      
          });

    })

})