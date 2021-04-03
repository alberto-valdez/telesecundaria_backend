'use strict'

var fs = require('fs');
var path = require('path');
var Alumno = require('../models/alumno');
var validator = require('validator');


var controller = {
    
    testRuta: (req, res) =>{
    
        return res.status(200).send({
        message: 'Test del controlador'

        });
    },

    saveAlumno: (req, res) =>{
        
        var params = req.body;

        try{
            var vCurp = !validator.isEmpty(params.curp);
            var vNombreAlumno = !validator.isEmpty(params.nombreAlumno);
            var vApellidoAlumno = !validator.isEmpty(params.apellidoAlumno);
            var vGrado = !validator.isEmpty(params.grado);
            var vGrupo = !validator.isEmpty(params.grupo);
            var vCiclo = !validator.isEmpty(params.ciclo);
            var vFechaNacimiento = !validator.isEmpty(params.fechaNacimiento);
            var vSexo = !validator.isEmpty(params.sexo);
            var vEdad = !validator.isEmpty(params.edad);
            var vTipoSangre = !validator.isEmpty(params.tipoSangre);
            var vLugarNacimiento = !validator.isEmpty(params.lugarNacimiento);
            var vTelefonoAlumno = !validator.isEmpty(params.telefonoAlumno);
            var vCorreo = !validator.isEmpty(params.correo);

            var vNombrePadre = !validator.isEmpty(params.nombrePadre);
            var vApellidoPadre = !validator.isEmpty(params.apellidoPadre);
            var vCurpPadre = !validator.isEmpty(params.curpPadre);
            var vfechaNacimientoPadre = !validator.isEmpty(params.nacimientoPadre);
       
            var vEdadPadre = !validator.isEmpty(params.edadPadre);
            var vInePadre = !validator.isEmpty(params.inePadre);
            var vEscolaridadPadre = !validator.isEmpty(params.escolaridadPadre);
            var vTelefonoPadre= !validator.isEmpty(params.telefonoPadre);
            var vTutorPadre = !validator.isEmpty(params.tutorPadre);

            var vNombreMadre = !validator.isEmpty(params.nombreMadre);
            var vApellidoMadre = !validator.isEmpty(params.apellidoMadre);
            var vCurpMadre = !validator.isEmpty(params.curpMadre);
            var vfechaNacimientoMadre = !validator.isEmpty(params.nacimientoMadre);
           
            var vEdadMadre = !validator.isEmpty(params.edadMadre);
            var vIneMadre = !validator.isEmpty(params.ineMadre);
            var vEscolaridadMadre = !validator.isEmpty(params.escolaridadMadre);
            var vTelefonoMadre= !validator.isEmpty(params.telefonoMadre);
            var vTutorMadre = !validator.isEmpty(params.tutorMadre);
            var vDomicilio = !validator.isEmpty(params.domicilio);

            


        } catch(err){
       
            return res.status(200).send({
                status:'error',
                message: 'Datos incompletos'
            });
        }
        if(vNombreAlumno && vApellidoAlumno && vCurp){

            var alumno = new Alumno();

            alumno.curp = params.curp;
            alumno.nombreAlumno = params.nombreAlumno;
            alumno.apellidoAlumno = params.apellidoAlumno;
            alumno.grado = params.grado;
            alumno.grupo = params.grupo;
            alumno.ciclo = params.ciclo;
            alumno.nacimientoAlumno = params.fechaNacimiento;
            alumno.sexo = params.sexo;
            alumno.edad = params.edad;
            alumno.tipoSangre = params.tipoSangre;
            alumno.lugarNacimiento = params.lugarNacimiento;
            alumno.telefonoAlumno = params.telefonoAlumno;
            alumno.correo = params.correo;

            alumno.nombrePadre = params.nombrePadre;
            alumno.apellidoPadre = params.apellidoPadre;
            alumno.curpPadre = params.curpPadre;
            alumno.nacimientoPadre = params.nacimientoPadre;
           
            alumno.edadPadre = params.edadPadre;
            alumno.inePadre = params.inePadre; 
            alumno.escolaridadPadre = params.escolaridadPadre;
            alumno.telefonoPadre = params.telefonoPadre;
            alumno.tutorPadre = params.tutorPadre;

            alumno.nombreMadre = params.nombreMadre;
            alumno.apellidoMadre = params.apellidoMadre;
            alumno.curpMadre = params.curpMadre;
            alumno.nacimientoMadre = params.nacimientoMadre;
          
            alumno.edadMadre = params.edadMadre;
            alumno.ineMadre = params.ineMadre; 
            alumno.escolaridadMadre = params.escolaridadMadre;
            alumno.telefonoMadre = params.telefonoMadre;
            alumno.tutorMadre = params.tutorMadre;

            alumno.domicilio = params.domicilio;
            alumno.image = null;

            alumno.save((err, alumnoGuardado) =>{
                if (err, !alumnoGuardado){
                    return res.status(404).send({
                        status: 'error',
                        message:'error al guardar datos del alumno'
                    });
                }

                return res.status(200).send({
                    status:'success',
                    alumnoGuardado
                });

            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Problema con los datos en el servidor'
            });
        }


    },

    getAlumnos: (req, res) =>{
        var query = Alumno.find({});

        query.sort('-_id').exec((err, alumnos)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message:'Error al devolver alumnos'
                })
            } 

            if(!alumnos){
                return res.status(404).send({
                    status:' error ',
                    messag: 'No hay articulos que mostrar'
                })
            }

            return res.status(200).send({
                status:'success',
                alumnos
            })
        })
    },

    getAlumno: (req, res) =>{

        var id = req.params.id;

        if(!id || id == null){
            return res.status(404).send({
                status: 'error',
                message:'No existe registro del alumno'                         
            })
        }

        Alumno.findById(id, (err, alumno)=>{
            if(err || !alumno){
                return res.status(200).send({
                    status: 'error',
                    message: 'no hay alumno que mostrar'
                })
            }

            return res.status(200).send({
                status:'success',
                alumno
            })
        })

    },

    upddateAlumno: (req, res) =>{
        var id = req.params.id;
        var params = req.body;
        
        try{
            var vCurp = !validator.isEmpty(params.curp);
            var vNombreAlumno = !validator.isEmpty(params.nombreAlumno);
            var vApellidoAlumno = !validator.isEmpty(params.apellidoAlumno);
            var vGrado = !validator.isEmpty(params.grado);
            var vGrupo = !validator.isEmpty(params.grupo);
            var vCiclo = !validator.isEmpty(params.ciclo);
            var vFechaNacimiento = !validator.isEmpty(params.fechaNacimiento);
            var vSexo = !validator.isEmpty(params.sexo);
            var vEdad = !validator.isEmpty(params.edad);
            var vTipoSangre = !validator.isEmpty(params.tipoSangre);
            var vLugarNacimiento = !validator.isEmpty(params.lugarNacimiento);
            var vTelefonoAlumno = !validator.isEmpty(params.telefonoAlumno);
            var vCorreo = !validator.isEmpty(params.correo);

            var vNombrePadre = !validator.isEmpty(params.nombrePadre);
            var vApellidoPadre = !validator.isEmpty(params.apellidoPadre);
            var vCurpPadre = !validator.isEmpty(params.curpPadre);
            var vfechaNacimientoPadre = !validator.isEmpty(params.nacimientoPadre);
       
            var vEdadPadre = !validator.isEmpty(params.edadPadre);
            var vInePadre = !validator.isEmpty(params.inePadre);
            var vEscolaridadPadre = !validator.isEmpty(params.escolaridadPadre);
            var vTelefonoPadre= !validator.isEmpty(params.telefonoPadre);
            var vTutorPadre = !validator.isEmpty(params.tutorPadre);

            var vNombreMadre = !validator.isEmpty(params.nombreMadre);
            var vApellidoMadre = !validator.isEmpty(params.apellidoMadre);
            var vCurpMadre = !validator.isEmpty(params.curpMadre);
            var vfechaNacimientoMadre = !validator.isEmpty(params.nacimientoMadre);
           
            var vEdadMadre = !validator.isEmpty(params.edadMadre);
            var vIneMadre = !validator.isEmpty(params.ineMadre);
            var vEscolaridadMadre = !validator.isEmpty(params.escolaridadMadre);
            var vTelefonoMadre= !validator.isEmpty(params.telefonoMadre);
            var vTutorMadre = !validator.isEmpty(params.tutorMadre);
            var vDomicilio = !validator.isEmpty(params.domicilio);
            


        } catch(err){
       
            return res.status(200).send({
                status:'error',
                message: 'Datos incompletos'
            });
        }

        if(vNombreAlumno && vApellidoAlumno && vCurp){
            Alumno.findByIdAndUpdate({_id: id}, params, {new:true}, (err, alumnoActualizado)=>{
                if(err){
                    return res.status(200).send({
                        status:'error',
                        message: ' hay un error al actualizar alummno'
                    })
                }

                if(!alumnoActualizado){
                    return res.status(200).send({
                        status: 'error',
                        message: 'No se encontro alumno para actualizar'
                    })
                }

                return res.status(200).send({
                    status:'success',
                    alumnoActualizado
                })
            })
        }

    },

    delateAlumno: (req, res) =>{
        var id = req.params.id;
        Alumno.findOneAndDelete({_id:id},(err, alumnoEliminado) =>{

            if (err){
                return res.status(500).send({
                    status:'error',
                    message: 'hubo un problema en el servidor'
                    
                })
            }

            if(!alumnoEliminado){
                return res.status(404).send({
                    status:'error',
                    message: 'no se encontro alumno'
                    
                })
            }

            return res.status(200).send({
                status:'success',
                alumno: alumnoEliminado
            })
        }) 


    },

    uploadImage: (req, res ) =>{
        var fileName = 'no image';

        if(!fileName){
            return res.status(200).send({
                status: 'error',
                message: fileName
            })
        }

        var filePath = req.files.file0.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[2];
        var extensionSplit = fileName.split('\.');
        var fileExtension = extensionSplit[1];

        if(fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg' && fileExtension != 'gif'){

            fs.unlink(filePath, (err) =>{
                return res.status(200).send({
                    status:'error',
                    message: 'extension de la imagen no valida'
                })
            })
        } else {
            var id = req.params.id;
            Alumno.findOneAndUpdate({_id: id}, {image: fileName}, {new:true}, (err, alumnoUp) =>{

                if(err || !alumnoUp){
                    return res.status(500).send({
                        status:'error',
                        message: 'Error al subir imagen '
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    message: 'Foto guardada',
                    alumno: alumnoUp
                })



                

            })
        }
    },

    getImage: (req, res) =>{
        var file = req.params.image;
        var pathFile = './upload/alumnos/'+file;

        fs.exists(pathFile, (exists) =>{

            if(exists) {
                return res.sendFile(path.resolve(pathFile));
            } else{
                return res.status(200).send({
                    status:'error',
                    message: 'imagen no existe'
                })
            }
        })

    },

    searchAlumno: (req, res) =>{
        var searchString = req.params.search;

        Alumno.find({"$or":[
            {"curp":{"$regex": searchString, "$options": "i"}},
            {"ciclo":{"$regex": searchString, "$options": "i"}},
            {"nombreAlumno":{"$regex": searchString, "$options": "i"}},
           {"apellidoAlumno":{"$regex": searchString, "$options": "i"}} 
        ]})
        .sort([['date', 'descending']])
        .exec((err, alumno)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Hubo un error en el servidor search'
                })
            }

            if(!alumno || alumno.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message:'No se encontro resultado search'
                })
            }

            return res.status(200).send({
                status:' success',
                alumno
            })
        })
    }

}

module.exports = controller;