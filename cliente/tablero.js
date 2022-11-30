function Tablero(size) {
    this.size = size;
    this.placingOnGrid = false;
    this.nombreBarco;
    this.flota;


    this.mostrar = function (si) {
        let x = document.getElementById("tablero");
        if (si) {
            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }
    }

    this.asignarFlotaListener = function () {
        var playerRoster = document.querySelector('.fleet-roster').querySelectorAll('li');
        for (var i = 0; i < playerRoster.length; i++) {
            playerRoster[i].self = this;
            playerRoster[i].addEventListener('click', this.rosterListener, false);
        }
    }

    this.init = function () {
        //Crear los tableros gráficos
        //Inicializar los listeners(Si usamos lo del bill)
        var humanCells = document.querySelector('.human-player').childNodes;
        for (let k = 0; k < humanCells.length; k++) {
            humanCells[k].self = this;
            humanCells[k].addEventListener('click', this.placementListener, false);
            //humanCells[k].addEventListener('mouseover', this.placementMouseover, false);
            //humanCells[k].addEventListener('mouseout', this.placementMouseout, false);
        }
        // Add a click listener to the roster	
        var playerRoster = document.querySelector('.fleet-roster').querySelectorAll('li');
        for (var i = 0; i < playerRoster.length; i++) {
            playerRoster[i].self = this;
            playerRoster[i].addEventListener('click', this.rosterListener, false);
        }

        var computerCells = document.querySelector('.computer-player').childNodes;
        for (var j = 0; j < computerCells.length; j++) {
            computerCells[j].self = this;
            computerCells[j].addEventListener('click', this.shootListener, false);
        }
    }

    this.colocarBarco = function (nombre, x, y) {

        console.log("Barco= " + nombre + " x= " + x + " y= " + y);
        cws.colocarBarco(nombre, x, y);
        //return true;

    }

    this.terminarDeColocarBarco = function (barco, x, y) {
        for (i = 0; i < barco.tam; i++) {
            console.log("x: " + (x + i) + " y:" + y);
            this.updateCell(x + i, y, "ship", 'human-player');
        }
        self.endPlacing(barco.nombre);
    }

    this.mostrarTablero = function (mostrar) {
        //Para que no se haga desde el principio lo hacemos aparte
        let tablero = document.getElementById("tablero");
        if (mostrar) {
            tablero.style.display = "block";
        } else {
            tablero.style.display = "none";
        }

    }
    //manjedores(click en el tablero propio,click tablero rival)
    //updateCell(actualizar las celdas)

    this.rosterListener = function (e) {
        let self = e.target.self;
        var li = this;
        // Remove all classes of 'placing' from the fleet roster first
        var roster = document.querySelectorAll('.fleet-roster li');
        for (let i = 0; i < roster.length; i++) {
            let classes = roster[i].getAttribute('class') || '';
            classes = classes.replace('placing', '');
            roster[i].setAttribute('class', classes);
        }

        // Set the class of the target ship to 'placing'
        self.nombreBarco = e.target.getAttribute('id');
        console.log(self.nombreBarco);
        document.getElementById(self.nombreBarco).setAttribute('class', 'placing');
        //Game.placeShipDirection = parseInt(document.getElementById('rotate-button').getAttribute('data-direction'), 10);
        self.placingOnGrid = true;
    };

    this.placementListener = function (e) {
        let self = e.target.self;
        console.log("Hola");
        //if (self.placingOnGrid) {
        console.log("Hola2")
        // Extract coordinates from event listener
        var x = parseInt(e.target.getAttribute('data-x'), 10);
        var y = parseInt(e.target.getAttribute('data-y'), 10);
        //console.log("Barco= " + self.nombreBarco + " x= " + x + " y= " + y)
        // Don't screw up the direction if the user tries to place again.
        self.colocarBarco(self.nombreBarco, x, y);
        //if (successful) {
        // Done placing this ship
        //self.endPlacing(Game.placeShipType);



        //self.placingOnGrid = false;
        // if (self.areAllShipsPlaced()) {
        //     let el = document.getElementById('rotate-button');
        //     el.addEventListener(transitionEndEventName(),(function(){
        //         el.setAttribute('class', 'hidden');
        //         if (gameTutorial.showTutorial) {
        //             document.getElementById('start-game').setAttribute('class', 'highlight');
        //         } else {
        //             document.getElementById('start-game').removeAttribute('class');	
        //         }
        //     }),false);
        //     el.setAttribute('class', 'invisible');
        // }
        //};
        //}
    };

    this.shootListener = function (e) {
        var x = parseInt(e.target.getAttribute('data-x'), 10);
        var y = parseInt(e.target.getAttribute('data-y'), 10);
        console.log("disparo x: " + x + " y: " + y);
        cws.disparar(x, y);
    }

    this.puedesColocarBarco = function (barco, x, y) { // nombre, x, y, colocado
        //obtener el barco completo a partir del nombre
        //bucle que recorra el tamaño del barco que marque las celdas
        console.log(barco);
        for (let i = 0; i < barco.tam; i++) {
            this.updateCell(x + i, y, "ship", "jugador-usuario");
        }

        this.endPlacing(barco.nombre); //Para marcar que ya se ha colocado
        
    }

    this.endPlacing = function (shipType) {
        document.getElementById(shipType).setAttribute('class', 'placed');
        self.placingOnGrid = false;

        // Mark the ship as 'used'
        // Game.usedShips[CONST.AVAILABLE_SHIPS.indexOf(shipType)] = CONST.USED;

        // // Wipe out the variable when you're done with it
        // Game.placeShipDirection = null;

        // Game.placeShipCoords = [];
    };

    this.updateCell = function (x, y, type, targetPlayer) {
        let player = targetPlayer;
        // if (targetPlayer === CONST.HUMAN_PLAYER) {
        //     player = 'human-player';
        // } else if (targetPlayer === CONST.COMPUTER_PLAYER) {
        //     player = 'computer-player';
        // } else {
        //     // Should never be called
        //     console.log("There was an error trying to find the correct player's grid");
        // }

        // switch (type) {
        //     case CONST.CSS_TYPE_EMPTY:
        //         this.cells[x][y] = CONST.TYPE_EMPTY;
        //         break;
        //     case CONST.CSS_TYPE_SHIP:
        //         this.cells[x][y] = CONST.TYPE_SHIP;
        //         break;
        //     case CONST.CSS_TYPE_MISS:
        //         this.cells[x][y] = CONST.TYPE_MISS;
        //         break;
        //     case CONST.CSS_TYPE_HIT:
        //         this.cells[x][y] = CONST.TYPE_HIT;
        //         break;
        //     case CONST.CSS_TYPE_SUNK:
        //         this.cells[x][y] = CONST.TYPE_SUNK;
        //         break;
        //     default:
        //         this.cells[x][y] = CONST.TYPE_EMPTY;
        //         break;
        // }

        var classes = ['grid-cell', 'grid-cell-' + x + '-' + y, 'grid-' + type];
        document.querySelector('.' + player + ' .grid-cell-' + x + '-' + y).setAttribute('class', classes.join(' '));
    };
    this.elementosGrid = function () {
        $('#gc').remove();
        let cadena = '<div class="game-container" id="gc">';
        cadena = cadena + '<div id="roster-sidebar">';
        cadena = cadena + '<h4>Barcos</h4><div id="flota"></div></div><div class="grid-container"><h2>Tu flota</h2>';
        cadena = cadena + '<div class="grid human-player"></div></div><div class="grid-container">';
        cadena = cadena + '<h2>Flota enemiga</h2><div class="grid computer-player"></div></div></div>';
        $('#ancla').append(cadena);
        this.createGrid();
    }
    this.mostrarFlota = function () {
        $("#listaF").remove();
        let cadena = '<ul class="fleet-roster" id="listaF">';
        for (let key in this.flota) {
            cadena = cadena + "<li id='" + key + "'>" + key + "</li>"
        }
        cadena = cadena + "</ul>";
        $('#flota').append(cadena);
        this.asignarFlotaListener();
    }

    this.createGrid = function () {
        var gridDiv = document.querySelectorAll('.grid');

        for (var grid = 0; grid < gridDiv.length; grid++) {
            //gridDiv[grid].removeChild(gridDiv[grid].querySelector('.no-js')); // Removes the no-js warning
            let myNode = gridDiv[grid];
            while (myNode.lastElementChild) {
                myNode.removeChild(myNode.lastElementChild);
            }
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    var el = document.createElement('div');
                    el.setAttribute('data-x', j);
                    el.setAttribute('data-y', i);
                    el.setAttribute('class', 'grid-cell grid-cell-' + j + '-' + i);
                    gridDiv[grid].appendChild(el);
                }
            }
        }

    };

    this.createGrid();
    this.init();


}

//colocar en el index.html los div class grid(css)
//cargar en el index.html los estilos(css)