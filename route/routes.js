'use strict'

var express = require('express');
var router = express.Router();
var controlador = require('../controllers/controller');
var controladorPago = require('../controllers/controllerPagos');
var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir : './upload/alumnos'});

//Rutas Alumno 
router.get('/testRuta', controlador.testRuta);
router.post('/saveAlumno', controlador.saveAlumno);
router.get('/getAlumnos', controlador.getAlumnos);
router.get('/getAlumno/:id', controlador.getAlumno);
router.put('/updateAlumno/:id', controlador.upddateAlumno);
router.delete('/deleteAlumno/:id', controlador.delateAlumno);
router.post('/uploadImg/:id', mdUpload ,controlador.uploadImage);
router.get('/getImage/:image', controlador.getImage);
router.get('/searchAlumno/:search', controlador.searchAlumno);
//Rutas Alumno 

//rutas de pago
router.get('/testRutaPago', controladorPago.testPago);
router.post('/addPago',  controladorPago.addPago);
router.get('/getPagos/:id?:search', controladorPago.getPagos);
router.get('/getPagosAlumno/:id', controladorPago.getPagoAlumno);
router.get('/getPago/:id', controladorPago.getPago);
router.put('/updatePago/:id', controladorPago.updatePago);
router.delete('/deletePago/:id', controladorPago.delatePago);
router.get('/searchPago/:search', controladorPago.searchPago);
//rutas de pago

module.exports = router;

