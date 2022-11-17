function ControlWeb() {
    this.comprobarCookie = function () {
        if ($.cookie("nick")) {
            rest.nick = $.cookie("nick");
            rest.comprobarUsuario();
            // cws.conectar();
            this.mostrarHome();
        }
        else {
            this.mostrarAgregarUsuario();
        }
    }

    this.mostrarAgregarUsuario = function () {   //LLAMADA AL SERVIDOR
        let cadena = '<div class="row" id="mAU">';//'<form class="form-row needs-validation"  id="mAJ">';
        cadena = cadena + "<div class='col'>";
        cadena = cadena + '<div class="row"><div class="col"><h2>El juego indefinido</h2></div></div>';
        cadena = cadena + '<div class="row">';
        cadena = cadena + '<div class="col">'
        cadena = cadena + '<input type="text" class="form-control mb-2 mr-sm-2" id="usr" placeholder="Introduce tu nick (max 6 letras)" required></div>';
        cadena = cadena + '<div class="col">';
        cadena = cadena + '<button id="btnAU" class="btn btn-primary mb-2 mr-sm-2">Iniciar sesión</button>';
        //cadena=cadena+'<a href="/auth/google" class="btn btn-primary mb-2 mr-sm-2">Accede con Google</a>';
        cadena = cadena + '</div>'; //' </form>';
        cadena = cadena + '<div id="nota"></div>';
        cadena = cadena + '</div></div></div>';

        $("#agregarUsuario").append(cadena);
        //$("#nota").append("<div id='aviso' style='text-align:right'>Inicia sesión con Google para jugar</div>");    

        $("#btnAU").on("click", function (e) {
            if ($('#usr').val() === '' || $('#usr').val().length > 6) {
                e.preventDefault();
                $('#nota').append('Nick inválido');
            }
            else {
                var nick = $('#usr').val();
                $("#mAU").remove();
                $("#aviso").remove();
                rest.agregarUsuario(nick);
                //mostrar gif --> Por ejmplo, aqui puedo poner un gif mientras espera a que el servidor contesta (muestra que está esperando)
            }
        })
    }

    this.mostrarHome = function () {

        $('#mH').remove();

        let cadena = "<div class='row' id='mH'>";
        cadena = cadena + '<div class="col">';
        cadena = cadena + "<p>Bienvenido " + rest.nick + "</p>";
        cadena = cadena + '<button id="btnSalir" class="btn btn-primary mb-2 mr-sm-2">Salir</button>';
        cadena = cadena + "<div id='codigo'></div>"
        cadena = cadena + "</div></div>";

        $('#agregarUsuario').append(cadena);
        this.mostrarCrearPartida();
        rest.obtenerListaPartidasDisponibles();

        $("#btnSalir").on("click", function (e) {
            $("#mCP").remove();
            $('#mLP').remove();
            $('#mH').remove();
            //rest.crearPartida();
            //$.removeCookie("nick");
            //iu.comprobarCookie();
        });
    }


    this.mostrarCrearPartida = function () {

        //dibujar un boton que al hacer click llame a crear partida de rest

        $('#mCP').remove();

        let cadena = '<div class="row" id="mCP">';//'<form class="form-row needs-validation"  id="mAJ">';
        cadena = cadena + '<div class="col">';
        cadena = cadena + '<button id="btnCP" class="btn btn-primary mb-2 mr-sm-2">Crear partida</button>';
        cadena = cadena + '</div>';
        cadena = cadena + '</div>';

        $('#crearPartida').append(cadena);

        $("#btnCP").on("click", function (e) {
            $("#mCP").remove();
            $('#mLP').remove();
            //rest.crearPartida();
            cws.crearPartida();
        });
    }

    this.mostrarAbandonarPartida = function(){

        $('#mAbP').remove();

        let cadena = '<div class="row" id="mAbP">';
        cadena = cadena + '<div class="col">'
        cadena = cadena + '<button id="btnAbP" class="btn btn-primary mb-2 mr-sm-2">Abandonar Partida</button>';
        cadena = cadena + '</div>'
        cadena = cadena + '</div>'

        $('#codigo').append(cadena);
        
        $("#btnAbP").on("click", function (e) {

            cws.abandonarPartida();
        })
    }

    this.mostrarCodigo = function (codigo) {
        let cadena = "Código de la partida: " + codigo;
        $('#codigo').append(cadena);

        iu.mostrarAbandonarPartida();
    }

    this.mostrarListaDePartidas = function (lista) {
        $('#mLP').remove();
        let cadena = "<div id='mLP'>";
        cadena = cadena + '<ul class="list-group">';

        for (i = 0; i < lista.length; i++) {
            cadena = cadena + '<li class="list-group-item">' + lista[i].codigo + ' propietario: ' + lista[i].owner + '</li>';
        }

        cadena = cadena + "</ul>";
        cadena = cadena + "</div>"
        $('#listaPartidas').append(cadena);

    }


    this.mostrarListaPartidasDisponibles = function (lista) {

        $('#mLP').remove();

        let cadena = "<div class='row' id='mLP'>";
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<h3>Lista de partidas disponibles</h3>";
        //cadena = cadena + '<button id="btnAP" class="btn btn-primary mb-2 mr-sm-2">Actualizar Partidas</button>';
        cadena = cadena + '<ul class="list-group">';
        for (i = 0; i < lista.length; i++) {
            cadena = cadena + '<li class="list-group-item"><a href="#" value="' + lista[i].codigo + '"> Nick propietario: ' + lista[i].owner + '</a></li>';
        }
        cadena = cadena + "</ul>";
        cadena = cadena + "</div></div>"
        $('#listaPartidas').append(cadena);


        $(".list-group a").click(function () {
            codigo = $(this).attr("value");
            console.log(codigo);
            if (codigo) {
                $('#mLP').remove();
                $('#mCP').remove();
                cws.unirseAPartida(codigo);
            }
        });

        $("#btnAL").on("click", function (e) { //este es el boton que hemos quitado por los WS
            $('#mLP').remove();
            rest.obtenerListaPartidasDisponibles();
        });
    }
    this.mostrarModal = function (msg) {
        $('#mM').remove();
        var cadena = "<p id='mM'>" + msg + "</p>";
        $('#contenidoModal').append(cadena);
        $('#miModal').modal("show");
    }

}

//(Jquery)Con almohadilla busca el id en el html, con punto buscará la clase, sin nada buscara los contenidos de la etiqueta
    //para eliminar: $('#mAU).remove()
