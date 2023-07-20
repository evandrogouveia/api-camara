const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/decretos`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newDecreto(req, res) {
        let dataForm = JSON.parse(req.body.formDecretos);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number || '';
        const secretary = dataForm.secretary || '';
        const competence = dataForm.competence || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/decretos/${req.files[0]?.filename}` : '';
        const description = dataForm.description || '';


        const newDecreto = `INSERT INTO decretos(
            typeFile,
            date, 
            exercise,
            number,
            secretary,
            competence,
            file,
            description
            ) VALUES (
                '${typeFile}',
                '${date}', 
                '${exercise}', 
                '${number}', 
                '${secretary}',
                '${competence}',
                '${file}',
                '${description}'
            )`;

        connection.query(newDecreto, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir decreto', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllDecretos(req, res) {
        const selectDecretos = `SELECT * FROM decretos ORDER BY date DESC`;

        connection.query(selectDecretos, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter decretos', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },
    
    updateDecreto(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formDecretos);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number || '';
        const secretary = dataForm.secretary || '';
        const competence = dataForm.competence || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/decretos/${req.files[0]?.filename}` : dataForm.file;
        const description = dataForm.description || '';

        const updateDecreto= 'UPDATE `decretos` SET `typeFile`= ?,' +
            '`date`= ?,' +
            '`exercise`= ?,' +
            '`number`= ?,' +
            '`secretary`= ?,' +
            '`competence`= ?,' +
            '`file`= ?,' +
            '`description`= ?' +
            'WHERE `decretos`.`ID`= ?';

        connection.query(updateDecreto, [
            typeFile,
            date,
            exercise,
            number,
            secretary,
            competence,
            file,
            description,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar decreto', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Decreto atualizado!' });
            }
        });
    },

    deleteDecreto(req, res) {
        const id = parseInt(req.params.id);
        const deleteDecreto = `DELETE FROM decretos WHERE ID = ?`;

        connection.query(deleteDecreto, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir decreto', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}