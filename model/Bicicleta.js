const db = require('./queries');

let Bicicleta = function (id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
  };

  Bicicleta.prototype.toString = function () {
    return `id: ${this.id} | color: ${this.color}`;
  };
  
  Bicicleta.allBicis = function () {
    return db.allBicis();
  };

  Bicicleta.add = function (aBici) {
    db.insertData(aBici)
    //Bicicleta.allBicis.push(aBici);
  };

  Bicicleta.allPoints = function () {
    return new Promise(function(resolve, reject){ 
      db.allBicisLocation().then(
        res=>{
          var locations = []
          for (let key in res) {
            locations.push(res[key].ubicacion)
          }
          resolve(locations)
        })
    });
  };

  Bicicleta.findById = function (aBiciId) {
    /*var aBici = Bicicleta.allBicis.find((x) => x.id == aBiciId);
    if (aBici) return aBici;
    else throw new Error(`No existe una Bicicleta con el id: ${aBiciId}`);*/
    return new Promise(function(resolve, reject){ 
      db.findId(aBiciId).then(res=>{
        if (res[0]) resolve(res[0]);
        else reject(`No existe una Bicicleta con el id: ${aBiciId}`);
      })
    });
  };

  Bicicleta.update = function (bici) {
    newvals={
      color:bici.color,
      modelo:bici.modelo,
      ubicacion:bici.ubicacion,
    }
    return db.updateBici(bici.id,newvals);
  };
  
  Bicicleta.removeById = function (aBiciId) {
    return db.deleteBici(aBiciId);
  };
  
module.exports = Bicicleta;