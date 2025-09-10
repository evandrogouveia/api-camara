const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/avisos-dispensa/`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newAviso(req, res) {
        let dataForm = JSON.parse(req.body.formAvisosDispensa);
        const arrayFile = [];
        for (const file of req.files) {
            arrayFile.push(`${process.env.BASE_URL}/uploads/avisos-dispensa/${file?.filename}`)
        }
        const titulo = dataForm.titulo;
        const exercicio = dataForm.exercicio;
        const modalidade = dataForm.modalidate || '';
        const dataInicial = dataForm.dataInicial || '';
        const dataFinal = dataForm.dataFinal || '';
        const responsavel = dataForm.responsavel || '';
        const valorEstimado = dataForm.valorEstimado || '';
        const descricao = dataForm.descricao || '';
        const files = arrayFile.length > 0 
        ? [...(Array.isArray(dataForm.file) ? dataForm.file : []), ...arrayFile]
        : dataForm.file;
        const lotes = dataForm.lotes || ''


        const newAviso = `INSERT INTO avisosDispensa(
            titulo,
            exercicio,
            modalidade,
            dataInicial,
            dataFinal,
            responsavel,
            valorEstimado,
            descricao,
            files,
            lotes
            ) VALUES (
                '${titulo}',
                '${exercicio}',
                '${modalidade}', 
                '${dataInicial}',
                '${dataFinal}',
                '${responsavel}',
                '${valorEstimado}',
                '${descricao}',
                '${JSON.stringify(files)}',
                '${JSON.stringify(lotes)}'
            )`;

        connection.query(newAviso, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllAviso(req, res) {
        const selectAviso = `SELECT * FROM avisosDispensa ORDER BY dataInicial DESC`;

        connection.query(selectAviso, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    updateAviso(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formAvisosDispensa);

        const arrayFile = [];
        for (const file of req.files) {
            arrayFile.push(`${process.env.BASE_URL}/uploads/avisos-dispensa/${file?.filename}`)
        }

        const titulo = dataForm.titulo;
        const exercicio = dataForm.exercicio;
        const modalidade = dataForm.modalidade || '';
        const dataInicial = dataForm.dataInicial || '';
        const dataFinal = dataForm.dataFinal || '';
        const responsavel = dataForm.responsavel || '';
        const valorEstimado = dataForm.valorEstimado || '';
        const descricao = dataForm.descricao || '';
        const files = arrayFile;
        const lotes = dataForm.lotes || ''

        const updateAviso = 'UPDATE `avisosDispensa` SET `titulo`= ?,' +
            '`exercicio`= ?,' +
            '`modalidade`= ?,' +
            '`dataInicial`= ?,' +
            '`dataFinal`= ?,' +
            '`responsavel`= ?,' +
            '`valorEstimado`= ?,' +
            '`descricao`= ?,' +
            '`files`= ?,' +
            '`lotes`= ?' +
            'WHERE `avisosDispensa`.`ID`= ?';

        connection.query(updateAviso, [
            titulo,
            exercicio,
            modalidade,
            dataInicial,
            dataFinal,
            responsavel,
            valorEstimado,
            descricao,
            JSON.stringify(files),
            JSON.stringify(lotes),
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Dados atualizado!' });
            }
        });
    },

    deleteAviso(req, res) {
        const id = parseInt(req.params.id);
        const deleteAviso = `DELETE FROM avisosDispensa WHERE ID = ?`;

        connection.query(deleteAviso, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}