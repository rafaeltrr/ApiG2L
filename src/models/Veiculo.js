const mongoose = require('mongoose');

const VeiculoSchema = new mongoose.Schema({

    Nome_proprietario:{
        type:String,
        default:'Sem proprietario'
    },
    Placa:{
        type:String,
        unique:true,
        required:true,
    },
    Renavam:{
        type:Number,
        unique:true,
        required: true,
    }

});
//
mongoose.model('Veiculo',VeiculoSchema);