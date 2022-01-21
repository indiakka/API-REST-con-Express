// Crear el cliente de mongo
const MongoClient = require("mongodb").MongoClient;
// Variable para almacenar la conexión
var db = null;
// Función para conectar con la base de datos
module.exports.connect = function (url, callback) {
  // Si ya está conectado, no se vuelve a conectar
  if (db) {
    return callback();
  }
  // Crear una instancia del cliente de MongoDB
  const client = new MongoClient(url, { useNewUrlParser: true });
  // Conectar el cliente al servidor
  client.connect(function (err, result) {
    if (err) {
      return callback(err);
    }
    console.log("Conectado a BD");
    db = result;
    callback();
  });
};
// Función para cerrar la conexión con la base de datos
module.exports.close = function (callback) {
  if (db) {
    db.close(function (err, result) {
      console.log("Desconectado de BD");
      db = null;
      callback(err);
    });
  }
};
// Función para obtener el cliente de MongoDB conectado a la DB
module.exports.get = function () {
  return db;
};
