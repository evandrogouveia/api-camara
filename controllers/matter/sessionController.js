const connection = require('../../database/connection');

module.exports = {
    //cadastra nova sessão
    newSession(req, res) {
        const date = req.body.date || '';
        const hour = req.body.hour || '';
        const number = req.body.number || '';
        const exercise = req.body.exercise || '';
        const status = req.body.status || '';
        const typeSession = req.body.typeSession || '';
        const siteShow = req.body.siteShow || '';
        const virtualSession = req.body.virtualSession || '';
        const callAldermans = req.body.callAldermans;
        const legislature = req.body.legislature || '';
        const description = req.body.description || '';

        const newTypePhase = `INSERT INTO sessions(
            date,
            hour,
            number,
            exercise,
            status,
            typeSession,
            siteShow,
            virtualSession,
            callAldermans,
            legislature,
            description
            ) VALUES (
                '${date}',
                '${hour}', 
                '${number}', 
                '${exercise}',
                '${status}',
                '${typeSession}',
                '${siteShow}',
                '${virtualSession}',
                '${JSON.stringify(callAldermans)}',
                '${legislature}',
                '${description}'
            )`;

        connection.query(newTypePhase, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos as sessões
     getAllSessions(req, res) {
        const selectSession = `SELECT * FROM sessions ORDER BY exercise DESC, number DESC`;

        connection.query(selectSession, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //retorna sessões limitadas
    getSessionsLimited(req, res) {
        const selectSession = `SELECT * FROM sessions ORDER BY exercise DESC, number DESC LIMIT 3`;

        connection.query(selectSession, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza a sessão
    updateSession(req, res) {
        const id = parseInt(req.params.id);
        const date = req.body.date || '';
        const hour = req.body.hour || '';
        const number = req.body.number || '';
        const exercise = req.body.exercise || '';
        const status = req.body.status || '';
        const typeSession = req.body.typeSession || '';
        const siteShow = req.body.siteShow || '';
        const virtualSession = req.body.virtualSession || '';
        const callAldermans = req.body.callAldermans;
        const legislature = req.body.legislature || '';
        const description = req.body.description || '';

        const updateSession = 'UPDATE `sessions` SET `date`= ?,' +
        '`hour`= ?,' +
        '`number`= ?,' +
        '`exercise`= ?,' +
        '`status`= ?,' +
        '`typeSession`= ?,' +
        '`siteShow`= ?,' +
        '`virtualSession`= ?,' +
        '`callAldermans`= ?,' +
        '`legislature`= ?,' +
        '`description`= ?' +
        'WHERE `sessions`.`ID`= ?';

        connection.query(updateSession, 
            [
                date,
                hour,
                number,
                exercise,
                status,
                typeSession,
                siteShow,
                virtualSession,
                JSON.stringify(callAldermans),
                legislature,
                description,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //delete uma sessão
    deleteSession(req, res) {
        const id = parseInt(req.params.id);
        const deleteSession = `DELETE FROM sessions WHERE ID = ?`;

        connection.query(deleteSession, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir sessão', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}