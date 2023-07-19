const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/diarias`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newDiaria(req, res) {
        let dataForm = JSON.parse(req.body.formDiaria);
        
        const date = dataForm.date;
        const exercise = dataForm.exercise || '';
        const number = dataForm.number || '';
        const agent = dataForm.agent || '';
        const company = dataForm.company || '';
        const city = dataForm.city || '';
        const uf = dataForm.uf || '';
        const tripStart = dataForm.tripStart || '';
        const tripEnd = dataForm.tripEnd || '';
        const quitationDate = dataForm.quitationDate || '';
        const secretary = dataForm.secretary || '';
        const quantity = dataForm.quantity || '';
        const unitValue = dataForm.unitValue || '';
        const totalValue = dataForm.totalValue || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/diarias/${req.files[0]?.filename}` : '';
        const description = dataForm.description || '';


        const newDiaria = `INSERT INTO diarias(
            date, 
            exercise,
            number,
            agent,
            company,
            city,
            uf,
            tripStart,
            tripEnd,
            quitationDate,
            secretary,
            quantity,
            unitValue,
            totalValue,
            file,
            description
            ) VALUES (
                '${date}', 
                '${exercise}', 
                '${number}',
                '${JSON.stringify(agent)}',
                '${company}',
                '${city}',
                '${uf}',
                '${tripStart}',
                '${tripEnd}',
                '${quitationDate}',
                '${secretary}',
                '${quantity}',
                '${unitValue}',
                '${totalValue}',
                '${file}',
                '${description}'
            )`;

        connection.query(newDiaria, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir diária', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllDiarias(req, res) {
        const selectDiarias = `SELECT * FROM diarias ORDER BY date DESC`;

        connection.query(selectDiarias, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter diarias', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },
    
    updateDiarias(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formDiaria);

        const date = dataForm.date;
        const exercise = dataForm.exercise || '';
        const number = dataForm.number || '';
        const agent = dataForm.agent || '';
        const company = dataForm.company || '';
        const city = dataForm.city || '';
        const uf = dataForm.uf || '';
        const tripStart = dataForm.tripStart || '';
        const tripEnd = dataForm.tripEnd || '';
        const quitationDate = dataForm.quitationDate || '';
        const secretary = dataForm.secretary || '';
        const quantity = dataForm.quantity || '';
        const unitValue = dataForm.unitValue || '';
        const totalValue = dataForm.totalValue || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/diarias/${req.files[0]?.filename}` : dataForm.file;
        const description = dataForm.description || '';

        const updateDiaria = 'UPDATE `diarias` SET `date`= ?,' +
            '`exercise`= ?,' +
            '`number`= ?,' +
            '`agent`= ?,' +
            '`company`= ?,' +
            '`city`= ?,' +
            '`uf`= ?,' +
            '`tripStart`= ?,' +
            '`tripEnd`= ?,' +
            '`quitationDate`= ?,' +
            '`secretary`= ?,' +
            '`quantity`= ?,' +
            '`unitValue`= ?,' +
            '`totalValue`= ?,' +
            '`file`= ?,' +
            '`description`= ?' +
            'WHERE `diarias`.`ID`= ?';

        connection.query(updateDiaria, [
            date,
            exercise,
            number,
            JSON.stringify(agent),
            company,
            city,
            uf,
            tripStart,
            tripEnd,
            quitationDate,
            secretary,
            quantity,
            unitValue,
            totalValue,
            file,
            description,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar diária', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Diária atualizada!' });
            }
        });
    },

    deleteDiaria(req, res) {
        const id = parseInt(req.params.id);
        const deleteDiaria = `DELETE FROM diarias WHERE ID = ?`;

        connection.query(deleteDiaria, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir diária', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}