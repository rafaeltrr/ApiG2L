const mongoose = require('mongoose');
const moment = require('moment-timezone');
moment.locale('pt-br');  
horas = moment().format('LLLL');    
//Pegar a data
// function Datadehoje(){
//     var data = new Date();
//     var dia = data.getDate();
//     var mes = data.getMonth();
//     var ano = data.getFullYear();
//     var hora = data.getHours();
//     var minutos = data.getMinutes();
//     var segundos = data.getSeconds();

//     return str_data = dia + '/' + (mes+1) + '/' + ano + ' às ' + hora + ':' + minutos + ':' + segundos; 
// }





const MotoristaSchema = new mongoose.Schema({

    Nome:{
        type: String,
        required: true,
    },
    Sobrenome:{
        type:String,
        required:true,
    },
    CPF:{
        type: Number,
        required:true,
        unique:true
    },
    Data_nascimento:{
        type:String,
        required:true,
    },
    Status:{
        type:String,
        default:'Ativo',
    },
    Id_veiculo: [{
        type:String,
        unique:false,
        required:false
      
    }],
    Data_cadastro:{
        type:String,
        default: horas,
    },
    Data_atualizacao:{
        type:String,
        default:horas,
    }

});

mongoose.model('Motorista',MotoristaSchema);