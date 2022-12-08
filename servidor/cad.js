var mongo = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

function Cad() {

    this.logs;

    //logs
    this.insertarLog = function (registroLog, callback) {
        insertar(this.logs, registroLog, callback);
    }


    this.obtenerLogs = function (callback) {
        obtenerTodos(this.logs, callback);
    }

    function obtenerTodos(coleccion,callback){
        coleccion.find().toArray(function(error,col){
            callback(col);
        });
    };



    /*registrar eventos: (en Partida, Usuario y en Juego --> como el crearPartida de Juego, por ejemplo el unirse  apartida va en agregarUsuario de partida)
        - inicios de sesion
        - cerrar sesion
        - crear partida
        - unir a partida
        - abandonar partida
        - partida finalizada
        - salir 
    */

    function insertar(coleccion, elemento, callback) { //insertar genérico que lo puedo utilizar para cualquier colección
        coleccion.insertOne(elemento, function (err, result) {
            if (err) {
                console.log("Error en insertar");
            }
            else {
                console.log("Nuevo elemento creado");
                callback(elemento);
            }
        });
    }


    this.conectar = function () { //método para conectar con la Base de Datos, va a llamar a las funciones del driver que permiten conectar con la base de datos
        let cad = this;
        mongo.connect("mongodb+srv://Monica:5aEb4JuvY3M7ARDH@cluster0.jzxdjrf.mongodb.net/test", { useUnifiedTopology: true }, function (err, database) {
            if (!err) {
                console.log("Conectado a MongoDB Atlas");
                database.db("Monica").collection("logs", function (err, col) {
                    if (err) {
                        console.log("No se puede obtener la coleccion")
                    }
                    else {
                        console.log("Tenemos la colección logs");
                        cad.logs = col;
                    }
                });
            } else {
                console.log("No se pudo conectar con MongoDB Atlas");
            }

        });
    }

    //this.conectar(); //lo hago en Jugador


}

module.exports.Cad = Cad;
