const connection = require('../../database/connection');

module.exports = {
     newConfiguracoes(req, res) {
        const minutos = req.body.minutos;
        const tempoTotal = req.body.tempoTotal;
        const votacaoEmBloco = req.body.votacaoEmBloco;
        const votacaoSecreta = req.body.votacaoSecreta;
        const periodoEleitoral = req.body.periodoEleitoral;
       
        const newConfiguracoes = `INSERT INTO configuracoes(
            minutos,
            tempoTotal,
            votacaoEmBloco,
            votacaoSecreta,
            periodoEleitoral
            ) VALUES (
                '${JSON.stringify(minutos)}',
                '${tempoTotal}',
                '${votacaoEmBloco}',
                '${votacaoSecreta}',
                '${periodoEleitoral}'
            )`;

        connection.query(newConfiguracoes, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getConfiguracoes(req, res) {
        const selectConfiguracoes = `SELECT * FROM configuracoes`;

        connection.query(selectConfiguracoes, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    updateConfiguracoes(req, res) {
        const id = parseInt(req.params.id);
        const minutos = req.body.minutos;
        const tempoTotal = req.body.tempoTotal;
        const votacaoEmBloco = req.body.votacaoEmBloco;
        const votacaoSecreta = req.body.votacaoSecreta;
        const periodoEleitoral = req.body.periodoEleitoral;

        const updateConfiguracoes = 'UPDATE `configuracoes` SET `minutos`= ?,' +
            '`tempoTotal`= ?,' +
            '`votacaoEmBloco`= ?,' +
            '`votacaoSecreta`= ?,' +
            '`periodoEleitoral`= ?' +
            ' WHERE `configuracoes`.`ID`= ?';

        connection.query(updateConfiguracoes, 
            [
                JSON.stringify(minutos), 
                tempoTotal,
                votacaoEmBloco,
                votacaoSecreta,
                periodoEleitoral,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    deleteConfiguracoes(req, res) {
        const id = parseInt(req.params.id);
        const deleteConfiguracoes = `DELETE FROM configuracoes WHERE ID = ?`;

        connection.query(deleteConfiguracoes, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir configuracoes', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
   
}
