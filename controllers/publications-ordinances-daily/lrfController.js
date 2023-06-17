const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/lrf`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newLrf(req, res) {
        let dataForm = JSON.parse(req.body.formLrf);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const secretary = dataForm.secretary || '';
        const competence = dataForm.competence || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/lrf/${req.files[0]?.filename}` : '';
        const description = dataForm.description || '';


        const newLrf = `INSERT INTO lrf(
            typeFile,
            date, 
            exercise,
            secretary,
            competence,
            file,
            description
            ) VALUES (
                '${typeFile}',
                '${date}', 
                '${exercise}', 
                '${secretary}',
                '${competence}',
                '${file}',
                '${description}'
            )`;

        connection.query(newLrf, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir lrf', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllLrf(req, res) {
        const selectLrf = `SELECT * FROM lrf ORDER BY date DESC`;

        connection.query(selectLrf, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter lrf', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },
    
    updateLrf(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formLrf);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const secretary = dataForm.secretary || '';
        const competence = dataForm.competence || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/lrf/${req.files[0]?.filename}` : dataForm.file;
        const description = dataForm.description || '';

        const updateLrf = 'UPDATE `lrf` SET `typeFile`= ?,' +
            '`date`= ?,' +
            '`exercise`= ?,' +
            '`secretary`= ?,' +
            '`competence`= ?,' +
            '`file`= ?,' +
            '`description`= ?' +
            'WHERE `lrf`.`ID`= ?';

        connection.query(updateLrf, [
            typeFile,
            date,
            exercise,
            secretary,
            competence,
            file,
            description,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar lrf', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Lrf atualizada!' });
            }
        });
    },

    deleteLrf(req, res) {
        const id = parseInt(req.params.id);
        const deleteLrf = `DELETE FROM lrf WHERE ID = ?`;

        connection.query(deleteLrf, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir lrf', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}