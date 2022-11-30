describe("El juego...", function () {
    var miJuego;
    var usr1, usr2, partida;

    beforeEach(function () {
        miJuego = new Juego();
        miJuego.agregarUsuario("pepe");
        miJuego.agregarUsuario("luis");
        res = miJuego.jugadorCreaPartida("pepe");
        miJuego.jugadorSeUneAPartida("luis", res.codigo);
        usr1 = miJuego.obtenerUsuario("pepe");
        usr2 = miJuego.obtenerUsuario("luis");
        partida = miJuego.obtenerPartida(res.codigo);

    });

    it("inicialmente", function () {
        let lista = miJuego.obtenerPartidas();
        expect(lista.length).toEqual(0);
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


    it("cada usuario tiene 2 tableros de 5x5, tablero propio y rival", function (){
        expect(usr1.tableroPropio).toBeDefined();
        expect(usr2.tableroPropio).toBeDefined();
        expect(usr1.tableroRival).toBeDefined();
        expect(usr2.tableroRival).toBeDefined();

        expcet(usr1.tableroPropio.casillas.length).toEqual(5);
        expcet(usr2.tableroPropio.casillas.length).toEqual(5);

        //habria que recorrer las 5 columnas
        for (x = 0; x < 5; x++) {
            expect(usr1.tableroPropio.casillas[x].length).toEqual(5);
        }
        //expect(usr2.tableroPropio.casillas[0].length).toEqual(5);

        //habria que recorrer todo el tablero
        expect(usr1.tableroPropio.casillas[0][0].contiene.nombre).toEqual();

    });

    it("los dos jugadores tienen flota (2 barcos, tam 2 y 4", function (){
        expect(usr1.flota).toBeDefined();
        expect(usr2.flota).toBeDefined();


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
    xit("El usuario luis se une a la partida", function () {
        let codigo = miJuego.partidas[0].codigo;
        user2.unirseAPartida(codigo);
        let partida = miJuego.partidas[codigo];
        expect(partida.jugadores[1].nick).toEqual(user2.nick);
    });


});
