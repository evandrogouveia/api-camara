const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/portarias`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newPortaria(req, res) {
        let dataForm = JSON.parse(req.body.formPortarias);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number || '';
        const agent = dataForm.agent || '';
        const secretary = dataForm.secretary || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/portarias/${req.files[0]?.filename}` : '';
        const description = dataForm.description || '';


        const newPortaria = `INSERT INTO portarias(
            typeFile,
            date, 
            exercise,
            number,
            agent,
            secretary,
            file,
            description
            ) VALUES (
                '${typeFile}',
                '${date}', 
                '${exercise}', 
                '${number}', 
                '${agent}',
                '${secretary}',
                '${file}',
                '${description}'
            )`;

        connection.query(newPortaria, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir portaria', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllPortarias(req, res) {
        const selectPortarias = `SELECT * FROM portarias ORDER BY date DESC`;

        connection.query(selectPortarias, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter portarias', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },
    
    updatePortaria(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formPortarias);
        
        const typeFile = dataForm.typeFile;
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const number = dataForm.number || '';
        const agent= dataForm.agent|| '';
        const secretary = dataForm.secretary || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/decretos/${req.files[0]?.filename}` : dataForm.file;
        const description = dataForm.description || '';

        const updatePortaria= 'UPDATE `portarias` SET `typeFile`= ?,' +
            '`date`= ?,' +
            '`exercise`= ?,' +
            '`number`= ?,' +
            '`agent`= ?,'  +
            '`secretary`= ?,' +
            '`file`= ?,' +
            '`description`= ?' +
            'WHERE `portarias`.`ID`= ?';

        connection.query(updatePortaria, [
            typeFile,
            date,
            exercise,
            number,
            agent,
            secretary,
            file,
            description,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar portaria', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Portaria atualizada!' });
            }
        });
    },

    deletePortaria(req, res) {
        const id = parseInt(req.params.id);
        const deletePortaria = `DELETE FROM portarias WHERE ID = ?`;

        connection.query(deletePortaria, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir portaria', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}