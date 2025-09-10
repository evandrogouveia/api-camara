const connection = require('../../database/connection');

module.exports = {

    newLive(req, res) {
        const title = req.body.title;
        const link = req.body.link;
        const active = req.body.active;

        const query = `INSERT INTO lives(
            title,
            link,
            active
            ) VALUES (
                '${title}',
                '${link}',
                '${active}'
            )`;

        connection.query(query, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir live', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getLives(req, res) {
        const query = `SELECT * FROM lives ORDER BY ID DESC`;

        connection.query(query, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter lives', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    updateLive(req, res) {
        const id = parseInt(req.params.id);
        const title = req.body.title;
        const link = req.body.link;
        const active = req.body.active;

        const query = 'UPDATE `lives` SET `title`= ?,' +
            '`link`= ?,' +
            '`active`= ?' +
            ' WHERE `lives`.`ID`= ?';

        connection.query(query, 
            [
                title, 
                link,
                active,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar live', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    deleteLive(req, res) {
        const id = parseInt(req.params.id);
        const query = `DELETE FROM lives WHERE ID = ?`;

        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir live', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}