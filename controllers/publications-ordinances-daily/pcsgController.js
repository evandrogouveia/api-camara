const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/pcsg`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newPcsg(req, res) {
        let dataForm = JSON.parse(req.body.formPcsg);
    
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const period = dataForm.period || '';
        const agent = dataForm.agent || '';
        const secretary = dataForm.secretary || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/pcsg/${req.files[0]?.filename}` : '';

        const newPcsg = `INSERT INTO pcsg(
            date, 
            exercise,
            period,
            agent,
            secretary,
            file
            ) VALUES (
                '${date}', 
                '${exercise}', 
                '${JSON.stringify(period)}',
                '${agent}',
                '${secretary}',
                '${file}'
            )`;

        connection.query(newPcsg, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir pcsg', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllPcsg(req, res) {
        const selectPcsg = `SELECT * FROM pcsg ORDER BY date DESC`;

        connection.query(selectPcsg, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter pcsg', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },
    
    updatePcsg(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formPcsg);
        
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const period = dataForm.period || '';
        const agent = dataForm.agent || '';
        const secretary = dataForm.secretary || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/pcsg/${req.files[0]?.filename}` : dataForm.file;

        const updatePcsg = 'UPDATE `pcsg` SET `date`= ?,' +
            '`exercise`= ?,' +
            '`period`= ?,' +
            '`agent`= ?,' +
            '`secretary`= ?,' +
            '`file`= ?' +
            'WHERE `pcsg`.`ID`= ?';

        connection.query(updatePcsg, [
            date,
            exercise,
            JSON.stringify(period),
            agent,
            secretary,
            file,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar pcsg', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Pcsg atualizada!' });
            }
        });
    },

    deletePcsg(req, res) {
        const id = parseInt(req.params.id);
        const deletePcsg = `DELETE FROM pcsg WHERE ID = ?`;

        connection.query(deletePcsg, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir pcsg', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}