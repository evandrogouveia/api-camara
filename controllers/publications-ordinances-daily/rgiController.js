const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/rgi`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newRgi(req, res) {
        let dataForm = JSON.parse(req.body.formRgi);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number;
        const secretary = dataForm.secretary;
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/rgi/${req.files[0]?.filename}` : '';
        const description = dataForm.description || '';


        const newRgi = `INSERT INTO rgi(
            typeFile,
            date, 
            exercise,
            number,
            secretary,
            file,
            description
            ) VALUES (
                '${typeFile}',
                '${date}', 
                '${exercise}', 
                '${number}',
                '${secretary}',
                '${file}',
                '${description}'
            )`;

        connection.query(newRgi, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir rgi', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllRgi(req, res) {
        const selectRgi = `SELECT * FROM rgi ORDER BY date DESC`;

        connection.query(selectRgi, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter rgi', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },
    
    updateRgi(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formRgi);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number || '';
        const secretary = dataForm.secretary;
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/rgi/${req.files[0]?.filename}` : dataForm.file;
        const description = dataForm.description || '';

        const updateRgi = 'UPDATE `rgi` SET `typeFile`= ?,' +
            '`date`= ?,' +
            '`exercise`= ?,' +
            '`number`= ?,' +
            '`secretary`= ?,' +
            '`file`= ?,' +
            '`description`= ?' +
            'WHERE `rgi`.`ID`= ?';

        connection.query(updateRgi, [
            typeFile,
            date,
            exercise,
            number,
            secretary,
            file,
            description,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar rgi', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Rgi atualizado!' });
            }
        });
    },

    deleteRgi(req, res) {
        const id = parseInt(req.params.id);
        const deleteRgi = `DELETE FROM rgi WHERE ID = ?`;

        connection.query(deleteRgi, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir rgi', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}