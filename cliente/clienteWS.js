function ClienteWS() {
    
    this.socket;

    //ZONA de enviar peticiones al cliente
    this.conectar=function(){
        this.socket=io(); //poner en marcha los socket
        this.servidorWS(); //escucho
    }
    this.crearPartida=function(){
        this.socket.emit("crearPartida",rest.nick);  //el atributo nick lo tenemos en el cliente Rest
    }

    this.unirseAPartida=function(){
        this.socket.emit("unirseAPartida",rest.nick, rest.codigo); 
    }


    //ZONA de gestionar peticiones
    this.servidorWS=function(){
        let cli=this;

        this.socket.on("partidaCreada", function(data){
            console.log(data);
            if(data.codigo!=-1){
                console.log("Usuario"+nick+"crea partida codigo"+ data.codigo);
                iu.mostrarCodigo(data.codigo);
            }
            else{
                console.log("No se ha podido crear partida");
            }
        })


        this.socket.on("unirseAPartida", function(data){
            console.log(data);
            if(data.codigo!=-1){
                console.log("Usuario"+nick+"se une a partida codigo"+ data.codigo);
                iu.mostrarCodigo(data.codigo);
            }
            else{
                console.log("No se ha podido unir a partida");
            }
        })
    }
}