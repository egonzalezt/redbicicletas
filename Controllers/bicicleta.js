const Bicicleta = require("../model/Bicicleta");

exports.list = function (req, res) {
  Bicicleta.allBicis().then(vals=>res.render("./Bicicletas/index", { bicis:vals})).catch((err)=>res.render("./Bicicletas/index", { bicis:[]}))
};

exports.show = function (req, res) {
  Bicicleta.findById(req.params.id).then(bici=>res.render("Bicicletas/show", { bici }));
};

exports.update = function (req, res) {
  Bicicleta.findById(req.params.id).then(bici=>res.render("Bicicletas/update", { bici: bici }));
};

exports.update_bici = function (req, res) {
  var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
  bici.ubicacion = [req.body.lat, req.body.lng];
  Bicicleta.update(bici).then(()=>res.redirect("/Bicicletas"))
};

exports.create_get = function (req, res) {
  res.render("Bicicletas/create");
};

exports.create_post = function (req, res) {
  var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
  bici.ubicacion = [req.body.lat, req.body.lng];
  Bicicleta.add(bici);
  res.redirect("/Bicicletas");
};

exports.delete = function (req, res) {
  Bicicleta.removeById(req.body.id).then(()=>res.redirect("/Bicicletas"));
};

exports.get_all_bicis = function (req, res) {
  Bicicleta.allPoints().then(bicislocation=>res.send(bicislocation));
};