const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/leis`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newLei(req, res) {
        let dataForm = JSON.parse(req.body.formLeis);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number;
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/leis/${req.files[0]?.filename}` : '';
        const description = dataForm.description || '';


        const newLei = `INSERT INTO leis(
            typeFile,
            date, 
            exercise,
            number,
            file,
            description
            ) VALUES (
                '${typeFile}',
                '${date}', 
                '${exercise}', 
                '${number}',
                '${file}',
                '${description}'
            )`;

        connection.query(newLei, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir lei', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllLeis(req, res) {
        const selectLei = `SELECT * FROM leis ORDER BY date DESC`;

        connection.query(selectLei, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter leis', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },
    
    updateLei(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formLeis);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/leis/${req.files[0]?.filename}` : dataForm.file;
        const description = dataForm.description || '';

        const updateLei = 'UPDATE `leis` SET `typeFile`= ?,' +
            '`date`= ?,' +
            '`exercise`= ?,' +
            '`number`= ?,' +
            '`file`= ?,' +
            '`description`= ?' +
            'WHERE `leis`.`ID`= ?';

        connection.query(updateLei, [
            typeFile,
            date,
            exercise,
            number,
            file,
            description,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar lei', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Lei atualizada!' });
            }
        });
    },

    deleteLei(req, res) {
        const id = parseInt(req.params.id);
        const deleteLei = `DELETE FROM leis WHERE ID = ?`;

        connection.query(deleteLei, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir lei', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}