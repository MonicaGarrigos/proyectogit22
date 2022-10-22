function ControlWeb() {

    this.mostrarAgregarUsuario = function () {   //LLAMADA AL SERVIDOR

        var cadena = '<div class="row" id="mAU">';//'<form class="form-row needs-validation"  id="mAU">';
        cadena = cadena + '<div class="row"><h2>El juego indefinido</h2></div>';
        cadena = cadena + '<div class="row">';
        cadena = cadena + '<div class="col">'
        cadena = cadena + '<input type="text" class="form-control mb-2 mr-sm-2" id="usr" placeholder="Introduce tu nick (max 6 letras)" required></div>';
        cadena = cadena + '<div class="col">';
        cadena = cadena + '<button id="btnAU" class="btn btn-primary mb-2 mr-sm-2">Iniciar sesión</button>';
        //cadena=cadena+'<a href="/auth/google" class="btn btn-primary mb-2 mr-sm-2">Accede con Google</a>';
        cadena = cadena + '</div>'; //' </form>';
        cadena = cadena + '<div id="nota"></div></div></div>';

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
                //Por ejmplo ---> Aqui puedo poner un gif mientras espera a que el servidor contesta (muestra que está esperando)
            }
        })
    }

    this.mostrarHome = function () {
        //Cadena="Bienvenido" + irest.nick;
        let cadena = "<div id='mH'>";
        cadena = cadena + "<p>Bienvenido " + rest.nick + "</p>";
        cadena = cadena + "</div>";
        $('#agregarUsuario').append(cadena);

    }


    this.mostrarCrearPartida=function(){
        //dibujar un boton, que al hacer click llame a crear partida de rest
    }

    this.mostrarListaDePartidas=function(lista){
        //crear un control visual tipo lista para mostrar la lista de partidas y permitir unirse con un click a la partida seleccionada
        // --> ir a boostrap (https://www.w3schools.com/bootstrap4/bootstrap_containers.asp) y ir a bs4 tables o bs4 list groups 


    }

}

