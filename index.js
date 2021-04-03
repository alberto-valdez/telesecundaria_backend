'use strict'
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var app = require('./app');
var port = 3333; 

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/telesecundaria_API', {useNewUrlParser: true})
.then(()=>{
    console.log('servidor iniciado')
    app.listen(port, ()=>{
        console.log('## Base de datos corriendo en el puerto '+port + ' ##');

    });
})