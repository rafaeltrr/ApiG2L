
const mongoose = require('mongoose');
const Veiculo = mongoose.model('Veiculo');


module.exports = {

    //Trás todos os dados salvos
    async index_veiculo(req, res) {
        const veiculo = await Veiculo.find();
        return res.json(veiculo);
    },

    //consulta por ID ou Placa
    async Show_veiculo(req, res) {
        //validação ID
        const contador = req.params.id;
        if (contador.indexOf('', 24) == 24) {
            const veiculo = await Veiculo.findById(req.params.id);
            if (veiculo == null) {
                return res.send('Veiculo não cadastrado');
            } else {
                return res.json(veiculo);
            }
        }
        else {
            //caso o parametro seja menor que o tamanho do ID, faz a busca pela Placa
            const veiculo = await Veiculo.findOne({ 'Placa': req.params.id })
            if (veiculo == null) {
                return res.send("Não encontrado")
            } else {
                return res.json(veiculo)

            }
        }

    },

    async store_veiculo(req, res) {
        const Placa = await Veiculo.find({ 'Placa': req.body.Placa })
        const Renavam = await Veiculo.find({ 'Renavam': req.body.Renavam })
        if (Placa == '') {
            if (Renavam == '') {

                const veiculo = await Veiculo.create(req.body);
                return res.json(veiculo)

            } else {

                return res.send('O Renavam já foi Cadastrado, informe outro numero de Renavam para o veiculo por favor');

            }
        } else {
            return res.send('Placa já cadastrada, informe outra placa para o veiculo')

        }
    },

    async update_veiculo(req, res) {

        const contador = req.params.id;
        if (contador.indexOf('', 24) == 24) {
            const veiculo = await Veiculo.findById(req.params.id);
            if (veiculo == null) {
                return res.send('veiculo não encontrado');
            } else {

                const veiculo = await Veiculo.findByIdAndUpdate(req.params.id, req.body, { new: true })
                return res.send("Atualizado");
            }
        }
        else {
            //caso menor que o tamanho do ID faz a busca pelo Placa
            const veiculo = await Veiculo.findOneAndUpdate({ 'Placa': req.params.id }, req.body, { new: true });
            if (veiculo == null) {
                return res.send("Não encontrado")
            } else {
                return res.send('Atualizado');
            }
        }




    },

    async destroy_veiculo(req, res) {

        const contador = req.params.id;
        if (contador.indexOf('', 24) == 24) {
            const veiculo = await Veiculo.findById(req.params.id);
            if (veiculo == null) {
                return res.send('veiculo não cadastrado');
            } else {
                await Veiculo.findByIdAndRemove(req.params.id);

                return res.send('Deletado');
            }
        }
        else {
            //caso menor que o tamanho do ID faz a busca pelo Placa
            const veiculo = await Veiculo.findOneAndDelete({ 'Placa': req.params.id })
            if (veiculo == null) {
                return res.send("Não encontrado")
            } else {
                return res.send('Deletado')

            }
        }

    }


}

