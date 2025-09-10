const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/licitacoes`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newLicitacao(req, res) {
        let dataForm = JSON.parse(req.body.formLicitacao);
        const arrayFile = [];
        for (const file of req.files) {
            arrayFile.push(`${process.env.BASE_URL}/uploads/licitacoes/${file?.filename}`)
        }
        const title = dataForm.title;
        const exercise = dataForm.exercise;
        const processNumber = dataForm.processNumber || '';
        const modality = dataForm.modality || '';
        const type = dataForm.type || '';
        const files = arrayFile;
        const openingDate = dataForm.openingDate || '';
        const publicationDate = dataForm.publicationDate || '';
        const estimatedValue = dataForm.estimatedValue || '';
        const description = dataForm.description || '';
        const comissionPresident = dataForm.comissionPresident || '';
        const responsibleInformin = dataForm.responsibleInforming || '';
        const responsibleTecnicalOpinion = dataForm.responsibleTecnicalOpinion || '';
        const responsibleAward = dataForm.responsibleAward || '';
        const responsibleHomologation = dataForm.responsibleHomologation || '';

        const newLicitacao = `INSERT INTO licitacoes(
            title,
            exercise,
            processNumber, 
            modality,
            type,
            files,
            openingDate,
            publicationDate,
            estimatedValue,
            description,
            comissionPresident,
            responsibleInformin,
            responsibleTecnicalOpinion,
            responsibleAward,
            responsibleHomologation
            ) VALUES (
                '${title}',
                '${exercise}',
                '${processNumber}', 
                '${modality}', 
                '${type}',
                '${JSON.stringify(files)}',
                '${openingDate}',
                '${publicationDate}',
                '${estimatedValue}',
                '${description}',
                '${comissionPresident}',
                '${responsibleInformin}',
                '${responsibleTecnicalOpinion}',
                '${responsibleAward}',
                '${responsibleHomologation}'
            )`;

        connection.query(newLicitacao, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllLicitacoes(req, res) {
        const selectLicitacao = `SELECT * FROM licitacoes ORDER BY publicationDate DESC`;

        connection.query(selectLicitacao, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getSearchLicitacoes(req, res) {
        const term = req.query.term[0];

        const selectLicitacoes = `SELECT * FROM licitacoes WHERE 
        LOWER(licitacoes.description) LIKE LOWER('%${term}%') OR
        LOWER(licitacoes.title) LIKE LOWER('%${term}%') OR
        LOWER(licitacoes.processNumber) LIKE LOWER('%${term}%') OR
        LOWER(licitacoes.openingDate) LIKE LOWER('%${term}%')
        `;

        connection.query(selectLicitacoes, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    updateLicitacao(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formLicitacao);

        // Novos arquivos enviados
        const newFiles = req.files.map(file => `${process.env.BASE_URL}/uploads/licitacoes/${file?.filename}`);

        // Verifica se os arquivos anteriores chegaram e garante que seja array
        let oldFiles = [];

        if (dataForm.files) {
            try {
                // Se veio como string JSON
                oldFiles = typeof dataForm.files === 'string'
                    ? JSON.parse(dataForm.files)
                    : dataForm.files;

                // Se não for array, converte em array
                if (!Array.isArray(oldFiles)) {
                    oldFiles = [oldFiles];
                }
            } catch (e) {
                oldFiles = [];
            }
        }

        // Junta arquivos antigos com novos
        const files = [...oldFiles, ...newFiles];

        const title = dataForm.title;
        const exercise = dataForm.exercise;
        const processNumber = dataForm.processNumber || '';
        const modality = dataForm.modality || '';
        const type = dataForm.type || '';
        const openingDate = dataForm.openingDate || '';
        const publicationDate = dataForm.publicationDate || '';
        const estimatedValue = dataForm.estimatedValue || '';
        const description = dataForm.description || '';
        const comissionPresident = dataForm.comissionPresident || '';
        const responsibleInformin = dataForm.responsibleInforming || '';
        const responsibleTecnicalOpinion = dataForm.responsibleTecnicalOpinion || '';
        const responsibleAward = dataForm.responsibleAward || '';
        const responsibleHomologation = dataForm.responsibleHomologation || '';

        const updateLicitacao = 'UPDATE `licitacoes` SET `title`= ?,' +
            '`exercise`= ?,' +
            '`files`= ?,' +
            '`processNumber`= ?,' +
            '`modality`= ?,' +
            '`type`= ?,' +
            '`openingDate`= ?,' +
            '`publicationDate`= ?,' +
            '`estimatedValue`= ?,' +
            '`description`= ?,' +
            '`comissionPresident`= ?,' +
            '`responsibleInformin`= ?,' +
            '`responsibleTecnicalOpinion`= ?,' +
            '`responsibleAward`= ?,' +
            '`responsibleHomologation`= ?' +
            'WHERE `licitacoes`.`ID`= ?';

        connection.query(updateLicitacao, [
            title,
            exercise,
            JSON.stringify(files),
            processNumber,
            modality,
            type,
            openingDate,
            publicationDate,
            estimatedValue,
            description,
            comissionPresident,
            responsibleInformin,
            responsibleTecnicalOpinion,
            responsibleAward,
            responsibleHomologation,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Dados atualizado!' });
            }
        });
    },

    deleteLicitacao(req, res) {
        const id = parseInt(req.params.id);
        const deleteLicitacao = `DELETE FROM licitacoes WHERE ID = ?`;

        connection.query(deleteLicitacao, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}