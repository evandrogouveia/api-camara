const connection = require('../../database/connection');

module.exports = {
    
    newServidor(req, res) {
        const nome = req.body.nome || '';
        const cargo = req.body.cargo || '';

        const newServidor = `INSERT INTO servidores(nome, cargo) VALUES ('${nome}', '${cargo}')`;

        connection.query(newServidor, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     getAllServidores(req, res) {
        const selectServidores = `SELECT * FROM servidores ORDER BY nome`;

        connection.query(selectServidores, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    deleteServidor(req, res) {
        const id = parseInt(req.params.id);
        const deleteServidor = `DELETE FROM servidores WHERE ID = ?`;

        connection.query(deleteServidor, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir servidor', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}