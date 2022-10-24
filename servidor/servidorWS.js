function ServidorWS(){

    //ZONA de enviar peticiones al cliente

    //ZONA de gestionar peticiones
    this.lanzarServidorWS=function(io,juego){
        io.on('connection', (socket) => {
            console.log('Usuario conectado');
          });
    }
}
module.exports.ServidorWS=ServidorWS;