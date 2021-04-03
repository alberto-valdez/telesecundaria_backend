'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pagosSchema = Schema({
     nombreAlumno : String,
     idAlumno: String,
     ciclo: String,
     concepto : String,
     total : String,
     abonado : String,
     estado : String




});

module.exports = mongoose.model('pagos', pagosSchema);