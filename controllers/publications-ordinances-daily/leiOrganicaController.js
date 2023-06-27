const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/lei_organica`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newLeiOrganica(req, res) {
        let dataForm = JSON.parse(req.body.formLeiOrganica);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number;
        const secretary = dataForm.secretary;
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/lei_organica/${req.files[0]?.filename}` : '';
        const description = dataForm.description || '';


        const newLeiOrganica = `INSERT INTO leiOrganica(
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

        connection.query(newLeiOrganica, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir lei organica', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllLeiOrganica(req, res) {
        const selectLeiOrganica = `SELECT * FROM leiOrganica ORDER BY date DESC`;

        connection.query(selectLeiOrganica, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter lei organica', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },
    
    updateLeiOrganica(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formLeiOrganica);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number || '';
        const secretary = dataForm.secretary;
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/lei_organica/${req.files[0]?.filename}` : dataForm.file;
        const description = dataForm.description || '';

        const updateLeiOrganica = 'UPDATE `leiOrganica` SET `typeFile`= ?,' +
            '`date`= ?,' +
            '`exercise`= ?,' +
            '`number`= ?,' +
            '`secretary`= ?,' +
            '`file`= ?,' +
            '`description`= ?' +
            'WHERE `leiOrganica`.`ID`= ?';

        connection.query(updateLeiOrganica, [
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
                res.status(400).json({ message: 'Erro ao atualizar lei organica', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Lei organica atualizada!' });
            }
        });
    },

    deleteLeiOrganica(req, res) {
        const id = parseInt(req.params.id);
        const deleteLeiOrganica = `DELETE FROM leiOrganica WHERE ID = ?`;

        connection.query(deleteLeiOrganica, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir lei organica', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}