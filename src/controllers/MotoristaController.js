
const mongoose = require('mongoose')
const moment = require('moment-timezone');
const Motorista = mongoose.model('Motorista')
const Veiculo = mongoose.model('Veiculo')
moment.locale('pt-br');



module.exports = {

    //Trás todos os dados salvos
    async index(req, res) {
        const motorista = await Motorista.find();
        return res.json(motorista);
    },
    //consulta por ID ou CPF
    async Show(req, res) {
        //validação ID
        const contador = req.params.id;
        if (contador.indexOf('', 24) == 24) {
            const motorista = await Motorista.findById(req.params.id);
            if (motorista == null) {
                return res.send('Motorista não cadastrado');
            } else {
                return res.json(motorista);

            }
        }
        else {
            //caso menor que o tamanho do ID faz a busca pelo CPF
            const motorista = await Motorista.findOne({ 'CPF': req.params.id })
            if (motorista == null) {
                return res.send("Não encontrado")
            } else {
                return res.json(motorista)
            }
        }

    },

    async store(req, res) {
        //verifica se o CPF já foi cadastrado
        const CPF = await Motorista.find({ 'CPF': req.body.CPF })
        if (CPF == '') {
            const motorista = await Motorista.create(req.body);
            return res.json(motorista)
        } else {
            return res.send('CPF já cadastrado');
        }
    },

    async update(req, res) {

        const contador = req.params.id;
        if (contador.indexOf('', 24) == 24) {
            const motorista = await Motorista.findById(req.params.id);
            if (motorista == null) {
                return res.send('Motorista não encontrado');
            } else {
                var horas = await moment().format('LLLL');
                const motorista = await (await Motorista.findByIdAndUpdate(req.params.id, req.body, { new: true })).updateOne({ Data_atualizacao: horas }, { new: true });
                return res.send("Atualizado");
            }
        }
        else {
            //caso menor que o tamanho do ID faz a busca pelo CPF
            var horas = await moment().format('LLLL');
            const motorista = await (await Motorista.findOneAndUpdate({ 'CPF': req.params.id }, req.body, { new: true })).updateOne({ Data_atualizacao: horas }, { new: true });
            if (motorista == null) {
                return res.send("Não encontrado")
            } else {
                return res.send('Atualizado');
            }

        }
    },

    async destroy(req, res) {

        const contador = req.params.id;
        if (contador.indexOf('', 24) == 24) {
            const motorista = await Motorista.findById(req.params.id);
            if (motorista == null) {
                return res.send('Motorista não cadastrado');
            } else {
                await Motorista.findByIdAndRemove(req.params.id);

                return res.send('Deletado');
            }
        }
        else {
            //caso menor que o tamanho do ID faz a busca pelo CPF
            const motorista = await Motorista.findOneAndDelete({ 'CPF': req.params.id })
            if (motorista == null) {
                return res.send("Não encontrado")
            } else {
                return res.send('Deletado');
            }

        }

    },


    async insertVeiculo(req, res) {
        //Poderia ter passado os valores pelo body, porém resolvi fazer de forma diferente.
        const contadorMotorista = req.params.id;
        const contadorVeiculo = req.params.id_veiculo
        if (contadorMotorista.indexOf('', 24) == 24 && contadorVeiculo.indexOf('', 24) == 24) {
            var motorista = await Motorista.findById(req.params.id);
            if (motorista == null) {
                return res.send('Motorista não encontrado');
            } else {
                const veiculo = await Veiculo.findById(req.params.id_veiculo);
                if (veiculo == null) {
                    return res.send('Veiculo não encontrado');
                }
                else {
                    motorista = await Motorista.findOne({ 'Id_veiculo': req.params.id_veiculo })
                    if (motorista == null) {
                        var horas = await moment().format('LLLL');
                        motorista = await Motorista.findByIdAndUpdate(req.params.id, { $push: { Id_veiculo: req.params.id_veiculo } }, { new: true }).updateOne({ Data_atualizacao: horas }, { new: true });
                        return res.send('Id adicionado');
                    }
                    else {
                        return res.send('id ja cadastrado')
                    }
                }
            }
        } else {
            return res.send('O id informado não é valido')
        }
    }







}