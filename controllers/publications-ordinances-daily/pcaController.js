const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/pca`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newPca(req, res) {
        let dataForm = JSON.parse(req.body.formPca);
    
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const period = dataForm.period || '';
        const agent = dataForm.agent || '';
        const secretary = dataForm.secretary || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/pca/${req.files[0]?.filename}` : '';

        const newPca = `INSERT INTO pca(
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

        connection.query(newPca, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir pca', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllPca(req, res) {
        const selectPca = `SELECT * FROM pca ORDER BY date DESC`;

        connection.query(selectPca, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter pca', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },
    
    updatePca(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formPca);
        
        const date = dataForm.date || '';
        const exercise = dataForm.exercise || '';
        const period = dataForm.period || '';
        const agent = dataForm.agent || '';
        const secretary = dataForm.secretary || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/pca/${req.files[0]?.filename}` : dataForm.file;

        const updatePca = 'UPDATE `pca` SET `date`= ?,' +
            '`exercise`= ?,' +
            '`period`= ?,' +
            '`agent`= ?,' +
            '`secretary`= ?,' +
            '`file`= ?' +
            'WHERE `pca`.`ID`= ?';

        connection.query(updatePca, [
            date,
            exercise,
            JSON.stringify(period),
            agent,
            secretary,
            file,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar pca', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Pca atualizada!' });
            }
        });
    },

    deletePca(req, res) {
        const id = parseInt(req.params.id);
        const deletePca = `DELETE FROM pca WHERE ID = ?`;

        connection.query(deletePca, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir pca', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}