const connection = require('../../database/connection');

module.exports = {
    //cadastra nova tramitação
    newProcedure(req, res) {
        const ruling = req.body.ruling || '';
        const procedureDate = req.body.procedureDate || '';
        const phase = req.body.phase || '';
        const situation = req.body.situation || '';
        const session = req.body.session || '';
        const officeHour = req.body.officeHour || '';
        const observation = req.body.observation || '';
        const matterID = req.body.matterID;

        const newProcedure = `INSERT INTO procedures(
             ruling,
             procedureDate,
             phase,
             situation,
             session,
             officeHour,
             observation,
             matterID
            ) VALUES (
                '${ruling}',
                '${procedureDate}', 
                '${phase}', 
                '${situation}',
                '${session}',
                '${officeHour}',
                '${observation}',
                '${matterID}'
            )`;

        connection.query(newProcedure, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos as tramitações
     getAllProcedures(req, res) {
        const selectMatter = `SELECT * FROM procedures ORDER BY procedureDate DESC`;

        connection.query(selectMatter, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza a tramitação
    updateProcedure(req, res) {
        const id = parseInt(req.params.id);
        const ruling = req.body.ruling || '';
        const procedureDate = req.body.procedureDate || '';
        const phase = req.body.phase || '';
        const situation = req.body.situation || '';
        const session = req.body.session || '';
        const officeHour = req.body.officeHour || '';
        const observation = req.body.observation || '';

        const updateProcedure = 'UPDATE `procedures` SET `ruling`= ?,' +
        '`procedureDate`= ?,' +
        '`phase`= ?,' +
        '`situation`= ?,' +
        '`session`= ?,' +
        '`officeHour`= ?,' +
        '`observation`= ?' +
        'WHERE `procedures`.`ID`= ?';

        connection.query(updateProcedure, 
            [
                ruling,
                procedureDate,
                phase,
                situation,
                session,
                officeHour,
                observation,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //deleta uma tramitação
    deleteProcedure(req, res) {
        const id = parseInt(req.params.id);
        const deleteProcedure = `DELETE FROM procedures WHERE ID = ?`;

        connection.query(deleteProcedure, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir tramitação', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}