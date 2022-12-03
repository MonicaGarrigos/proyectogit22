let modelo = require("./modelo.js");

describe("El juego...", function () {
    var miJuego;
    var usr1, usr2, partida;

    beforeEach(function () {  //lo que pones en el beforeEach se ejecuta siempre antes de cada it -- cada comprobacion es independiente
        miJuego = new modelo.Juego();
        miJuego.agregarUsuario("pepe");
        miJuego.agregarUsuario("luis");
        let res = miJuego.jugadorCreaPartida("pepe");
        miJuego.jugadorSeUneAPartida("luis", res.codigo);
        usr1 = miJuego.obtenerUsuario("pepe");
        usr2 = miJuego.obtenerUsuario("luis");
        partida = miJuego.obtenerPartida(res.codigo);

    });

    it("inicialmente", function () {
        // let lista = miJuego.obtenerPartidas();
        // expect(lista.length).toEqual(0);
        expect(usr1.nick).toEqual("pepe");
        expect(usr2.nick).toEqual("luis");
        //comprobar que los usuarios están en la partida
        //comprobar que cada usuario tiene 2 tableros de 5x5, tablero propio y rival
        //que contiene agua (esAgua())
        //comprobar que cada usuario tiene 1 flota de 2 barcos
        //de tamaño 4 y 2
        //comprobar que la partida esta en fase jugando
        //los dos jugadores tienen flota

    });

    it("luis y pepe están en la partida", function () {
        expect(partida.estoy("pepe")).toBeTrue();
        expect(partida.estoy("luis")).toBeTrue();

    });


    it("cada usuario tiene 2 tableros de 5x5, tablero propio y rival", function () {
        expect(usr1.tableroPropio).toBeDefined();
        expect(usr2.tableroPropio).toBeDefined();

        expect(usr1.tableroRival).toBeDefined();
        expect(usr2.tableroRival).toBeDefined();

        expcet(usr1.tableroPropio.casillas.length).toEqual();
        expcet(usr2.tableroPropio.casillas.length).toEqual(SIZE);

        //habria que recorrer las 5 columnas
        for (x = 0; x < 5; x++) {
            expect(usr1.tableroPropio.casillas[x].length).toEqual(SIZE);
        }
        //expect(usr2.tableroPropio.casillas[0].length).toEqual(5);

        //habria que recorrer todo el tablero
        for (x = 0; x < 10; x++) { //us1.tableroPropio.casillas.length
            for (y = 0; y < 10; y++) {//us1.tableroPropio.casillas[x].length
                expect(us1.tableroPropio.casillas[x][y].contiene.nombre).toEqual("agua");
            }
        }
    });

    it("los dos jugadores tienen flota (2 barcos, tam 2 y 4", function () {
        expect(usr1.flota).toBeDefined();
        expect(usr2.flota).toBeDefined();

        //expect(us1.flota.length).toEqual(2);  //da fallo porq es un array asociativo
        expect(Object.keys(usr1.flota).length).toEqual(2); //seria asi
        expcet(Object.keys(usr2.flota).length).toEqual(2)

        //expect(us1.flota[0].tam).toEqual(2); //aqui igual
        expect(usr1.flota["b2"].tam).toEqual(2);
        expect(usr1.flota["b4"].tam).toEqual(4);

    });


    it("la partida esta en fase desplegando", function () {
        expect(partida.esJugando()).toEqual(false);
        expect(partida.esDesplegando()).toEqual(true);
    });

    /*
        it("Crear partida", function () {
            let codigo = user1.crearPartida();
            expect(miJuego.partidas[codigo]).toBeDefined();    //Comprueba que existe
            let partida = miJuego.partidas[codigo];
            expect(partida.owner.nick).toEqual(user1.nick);
            expect(partida.jugadores[0].nick).toEqual(user1.nick);
            expect(partida.codigo).toEqual(codigo);
        });
    */


    describe("Barcos fuera de limites", function () {
        beforeEach(function () {
            us1.colocarBarco("b2", 9, 9); // no cabe
            us1.colocarBarco("b4", 9, 7); // no cabe
            us1.barcosDesplegados();
            us2.colocarBarco("b2", 7, 7);// Este si deberia el resto no 7,7 8,7
            us2.colocarBarco("b4", 9, 9);// no cabe
            us2.barcosDesplegados();
        });

        it("Comprobar que no se puede colocar barcos fuera de los limites", function () {
            barco2us1 = us1.obtenerBarcoDesplegado("b2");
            barco4us1 = us1.obtenerBarcoDesplegado("b4");
            barco2us2 = us2.obtenerBarcoDesplegado("b2");
            barco4us2 = us2.obtenerBarcoDesplegado("b4");
            expect(us1.tableroPropio.casillas[9][9].contiene.nombre).toEqual("agua");
            expect(us1.tableroPropio.casillas[9][7].contiene.nombre).toEqual("agua");
            expect(us2.tableroPropio.casillas[7][7].contiene).toEqual(barco2us2);//En estos dos si deberian de estar
            expect(us2.tableroPropio.casillas[8][7].contiene).toEqual(barco2us2);
            expect(us2.tableroPropio.casillas[9][9].contiene.nombre).toEqual("agua");
        })
    });


    it("Comprobar que los barcos estan bien colocados", function () {
        barco2us1 = us1.obtenerBarcoDesplegado("b2");
        barco4us1 = us1.obtenerBarcoDesplegado("b4");
        barco2us2 = us2.obtenerBarcoDesplegado("b2");
        barco4us2 = us2.obtenerBarcoDesplegado("b4");

        expect(us1.tableroPropio.casillas[0][0].contiene).toEqual(barco2us1);
        expect(us1.tableroPropio.casillas[1][0].contiene).toEqual(barco2us1);
        expect(us1.tableroPropio.casillas[0][1].contiene).toEqual(barco4us1);
        expect(us1.tableroPropio.casillas[1][1].contiene).toEqual(barco4us1);
        expect(us1.tableroPropio.casillas[2][1].contiene).toEqual(barco4us1);
        expect(us1.tableroPropio.casillas[3][1].contiene).toEqual(barco4us1);
        expect(us2.tableroPropio.casillas[3][3].contiene).toEqual(barco2us2);
        expect(us2.tableroPropio.casillas[4][3].contiene).toEqual(barco2us2);
        expect(us2.tableroPropio.casillas[4][4].contiene).toEqual(barco4us2);
        expect(us2.tableroPropio.casillas[5][4].contiene).toEqual(barco4us2);
        expect(us2.tableroPropio.casillas[6][4].contiene).toEqual(barco4us2);
        expect(us2.tableroPropio.casillas[7][4].contiene).toEqual(barco4us2);


    });



    xit("El usuario luis se une a la partida", function () {
        let codigo = miJuego.partidas[0].codigo;
        user2.unirseAPartida(codigo);
        let partida = miJuego.partidas[codigo];
        expect(partida.jugadores[1].nick).toEqual(user2.nick);
    });



    describe("A jugar!", function () {  //Primero se inicializa todo lo anterior y después esta parte

        beforeEach(function () {
            usr1.colocarBarco("b2", 0, 0); // 0,0,1,0
            usr1.colocarBarco("b4", 0, 1); // 0,1,1,1,2,1,3,1
            usr1.barcosDesplegados();

            usr2.colocarBarco("b2", 0, 0);
            usr2.colocarBarco("b4", 0, 1);
            usr2.barcosDesplegados();
        });

        it("Comprobar que las flotas están desplegadas", function () {
            //metodos todosDesplegados...
            expect(us1.todosDesplegados()).toEqual(true);
            expect(us2.todosDesplegados()).toEqual(true);

        });

        it("Comprobar jugada que Pepe gana", function () {
            expect(usr2.flota["b2"].obtenerEstado()).toEqual("intacto");
            expect(usr2.flota["b4"].obtenerEstado()).toEqual("intacto");
            usr1.disparar(3, 3);
            expect(usr2.flota["b2"].obtenerEstado()).toEqual("tocado");
            usr1.disparar(4, 3);
            expect(usr2.flota["b2"].obtenerEstado()).toEqual("hundido");
            expect(usr2.flota["b4"].obtenerEstado()).toEqual("intacto");
            usr1.disparar(4, 4);
            expect(usr2.flota["b4"].obtenerEstado()).toEqual("tocado");
            usr1.disparar(5, 4);
            usr1.disparar(6, 4);
            usr1.disparar(7, 4);
            expect(usr2.flota["b4"].obtenerEstado()).toEqual("hundido");
            expect(usr2.flotaHundida()).toEqual(true);
            expect(usr1.flotaHundida()).toEqual(false);
        });

        it("Comprobar el cambio de turno", function () {
            expect(partida.turno).toEqual(usr1);
            usr1.disparar(2, 2);
            expect(partida.turno).toEqual(usr2);


        });

        it("Comprobar que no deja disparar sin turno", function () {
            expect(partida.turno).toEqual(usr1);
            expect(usr1.flota["b2"].obtenerEstado()).toEqual("intacto");
            usr2.disparar(0, 0);
            expect(usr1.flota["b2"].obtenerEstado()).toEqual("intacto");

        });



    });



});
