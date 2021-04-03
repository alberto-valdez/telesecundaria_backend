var Pago = require('../models/pagos');
var validator = require('validator');

var controladorPago = {

    testPago : (req, res) =>{
        return res.status(200).send({
            status: 'success',
            message: 'Ruta de testeo pago correcta'
        })
    },

    addPago: (req, res) => {
       var params = req.body;

       try{

        var vNombreAlumno = !validator.isEmpty(params.nombreAlumno);
        var vIdAlumno = !validator.isEmpty(params.idAlumno);
        var vCiclo = !validator.isEmpty(params.ciclo);
        var vConcepto = !validator.isEmpty(params.concepto);
        var vTotal = !validator.isEmpty(params.total);
        var vabonado = !validator.isEmpty(params.abonado);
        var vEstado = !validator.isEmpty(params.estado);


       } catch(err) {

        return res.status(200).send({
            status:'error',
            message: 'Datos incompletos'
        });


       }

       if(vNombreAlumno && vConcepto && vTotal && vabonado && vEstado && vCiclo){

        var pago = new Pago();

        pago.nombreAlumno = params.nombreAlumno;
        pago.idAlumno = params.idAlumno;
        pago.ciclo = params.ciclo;
        pago.concepto = params.concepto;
        pago.total = params.total;
        pago.abonado = params.abonado;
        pago.estado = params.estado;
        pago.save((err, pagoRealizado)=>{
            if(err, !pagoRealizado){
                return res.status(404).send({
                    status: 'error',
                    message:'error al guardar datos del pago'
                });
            }

            return res.status(200).send({
                status:'success',
                pagoRealizado
            })
        })
           
       } else {

        return res.status(200).send({
            status:'error',
            message: 'Datos incompletos'
        });



       }


    },

    getPagos: (req, res) => {
      var id = req.params.id;
        var query = Pago.find({});

        query.sort('-_id').exec((err, pagos)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'error en el servidor'
                })
            }

            if(!pagos){
                return res.status(404).send({
                    status: 'error',
                    message: 'no se encontraron pagos'
                })
            }

            return res.status(200).send({
                status: 'success',
                pagos
            })
        })


    },
    
    getPago : (req, res) => {
        var id = req.params.id;

        if(!id || id == null){
            return res.status(200).send({
                status: 'error',
                message: 'No se encontro un id'
            })
        }

        Pago.findById(id, (err, pago) =>{
        

            if(err || !pago){
                return res.status(404).send({
                    status: 'error',
                    message: 'no se encontro pago'
                })
            }

            return res.status(200).send({
                status: 'success',
                pago
            })
        })

    },

    updatePago : (req, res) => {
        var id = req.params.id;
        var params = req.body;


        try{

            var vNombreAlumno = !validator.isEmpty(params.nombreAlumno);
            var vCiclo = !validator.isEmpty(params.ciclo);
            var vConcepto = !validator.isEmpty(params.concepto);
            var vTotal = !validator.isEmpty(params.total);
            var vabonado = !validator.isEmpty(params.abonado);
            var vEstado = !validator.isEmpty(params.estado);
    
    
           } catch(err) {
    
            return res.status(200).send({
                status:'error',
                message: 'Datos incompletos'
            });
    
    
           }
           if(vNombreAlumno && vConcepto && vTotal && vabonado && vEstado && vCiclo){
                Pago.findByIdAndUpdate({_id: id},params, {new:true}, (err, pagoActualizado)=>{

                    if(err){
                        return res.status(200).send({
                            status:'error',
                            message: ' hay un error al actualizar pago'
                        })
                    }
    
                    if(!pagoActualizado){
                        return res.status(200).send({
                            status: 'error',
                            message: 'No se encontro pago para actualizar'
                        })
                    }
    
                    return res.status(200).send({
                        status:'success',
                        pagoActualizado
                    })
                })

           }


    },

    delatePago: (req, res) => {
        var id = req.params.id;

        Pago.findOneAndDelete({_id: id}, (err, pagoDeleted) => {
            if (err){
                return res.status(500).send({
                    status:'error',
                    message: 'hubo un problema en el servidor'
                    
                })
            }

            if(!pagoDeleted){
                return res.status(404).send({
                    status:'error',
                    message: 'no se encontro pago'
                    
                })
            }

            return res.status(200).send({
                status:'success',
                alumno: pagoDeleted
            })
     
        })
    },

    searchPago: (req, res) => {
        var searchString = req.params.search;
        var id = req.params.id;

        Pago.find( {"idAlumno": id, "$or": [
            {"nombreAlumno": {"$regex": searchString, "$options": "i"}},
            {"concepto": {"$regex": searchString, "$options": "i"}},
            {"ciclo": {"$regex": searchString, "$options": "i"}},
            {"estado": {"$regex": searchString, "$options": "i"}}
        ]}).sort([["date", "descending"]])
        .exec((err, pago) =>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'hubo un error en la busqueda del pago'
                })
            }

            if(!pago){
                return res.status(404).send({
                    status:'error',
                    message:'No se encontro un resultado del pago'
                })
            }

            return res.status(200).send({
                status: 'success',
                pago
            })

            
        })
    },


    getPagoAlumno: (req, res) => {
        var id = req.params.id;

        Pago.find({"$or": [
            {"idAlumno": {"$regex": id, "$options": "i"}}
        ]}).sort([["_id", -1]])
        .exec((err, pago) =>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'hubo un error en la busqueda del pago'
                })
            }

            if(!pago){
                return res.status(404).send({
                    status:'error',
                    message:'No se encontro un resultado del pago'
                })
            }

            return res.status(200).send({
                status: 'success',
                pago
            })

            
        })
    }






}

module.exports = controladorPago;


