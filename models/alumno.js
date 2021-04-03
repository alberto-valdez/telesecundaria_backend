'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alumnoSchema = Schema ({

    curp: String,
    nombreAlumno: String,
    apellidoAlumno:  String,
    grado:  String,
    grupo:  String,
    ciclo: String,
    nacimientoAlumno:  String,
    sexo:  String,
    tipoSangre: String,
    edad: String,
    lugarNacimiento: String,
    telefonoAlumno:  String,
    correo: String,
    
    nombrePadre:  String,
    apellidoPadre:  String,
    nacimientoPadre:  String,

    edadPadre:  String,
    curpPadre: String,
    inePadre:  String,
    escolaridadPadre:  String,
    telefonoPadre:  String,
    tutorPadre:  String,

    nombreMadre:  String,
    apellidoMadre:  String,
    nacimientoMadre:  String,
    
    edadMadre:  String,
    curpMadre: String,
    ineMadre:  String,
    escolaridadMadre:  String,
    telefonoMadre:  String,
    tutorMadre:  String,
    domicilio: String,
    image: String
});

module.exports = mongoose.model('Alumno', alumnoSchema );