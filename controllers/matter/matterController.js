const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/matter`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),

    //cadastra nova matéria
    newMatter(req, res) {
        let dataForm = JSON.parse(req.body.formMatter);

        const matterDate = dataForm.matterDate || '';
        const matterNumber = dataForm.matterNumber || '';
        const matterExercise = dataForm.matterExercise || '';
        const matterType = dataForm.matterType || '';
        const originType = dataForm.originType || '';
        const showOnSite = dataForm.showOnSite || '';
        const votationType = dataForm.votationType || '';
        const matterDescription = dataForm.matterDescription || '';
        const matterBody = dataForm.matterBody || '';
        const matterJustification = dataForm.matterJustification || '';
        const matterCompleteText = dataForm.matterCompleteText || '';
        const origin = dataForm.origin || '';
        const agentVotation = dataForm.agentVotation || '';
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/matter/${req.files[0]?.filename}` : '';
        const IDsessao = dataForm.IDsessao;

        const newMatter = `INSERT INTO matter(
             matterDate,
             matterNumber,
             matterExercise,
             matterType,
             originType,
             showOnSite,
             votationType,
             matterDescription,
             matterBody,
             matterJustification,
             matterCompleteText,
             origin,
             agentVotation,
             file,
             IDsessao
            ) VALUES (
                '${matterDate}',
                '${matterNumber}', 
                '${matterExercise}', 
                '${matterType}',
                '${originType}',
                '${showOnSite}',
                '${votationType}',
                '${matterDescription}',
                '${matterBody}',
                '${matterJustification}',
                '${matterCompleteText}',
                '${JSON.stringify(origin)}',
                '${JSON.stringify(agentVotation)}',
                '${file}',
                '${IDsessao}'
            )`;

        connection.query(newMatter, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos as materias
     getAllMatter(req, res) {
        const selectMatter = `SELECT * FROM matter ORDER BY matterDate DESC`;

        connection.query(selectMatter, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza a matéria
    updateMatter(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formMatter);
     
        const matterDate = dataForm.matterDate || '';
        const matterNumber = dataForm.matterNumber || '';
        const matterExercise = dataForm.matterExercise || '';
        const matterType = dataForm.matterType || '';
        const originType = dataForm.originType || '';
        const showOnSite = dataForm.showOnSite || '';
        const votationType = dataForm.votationType || '';
        const matterDescription = dataForm.matterDescription || '';
        const matterBody = dataForm.matterBody || '';
        const matterJustification = dataForm.matterJustification || '';
        const matterCompleteText = dataForm.matterCompleteText || '';
        const origin = dataForm.origin || '';
        const agentVotation = dataForm.agentVotation;
        const file = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/matter/${req.files[0]?.filename}` : dataForm.file;
        const IDsessao = dataForm.IDsessao;
       
        const updateMatter = 'UPDATE `matter` SET `matterDate`= ?,' +
        '`matterNumber`= ?,' +
        '`matterExercise`= ?,' +
        '`matterType`= ?,' +
        '`originType`= ?,' +
        '`showOnSite`= ?,' +
        '`votationType`= ?,' +
        '`matterDescription`= ?,' +
        '`matterBody`= ?,' +
        '`matterJustification`= ?,' +
        '`matterCompleteText`= ?,' +
        '`origin`= ?,' +
        '`agentVotation`= ?,' +
        '`file`= ?,' +
        '`IDsessao`= ?' +
        ' WHERE `matter`.`ID`= ?';

        connection.query(updateMatter, 
            [
                matterDate,
                matterNumber,
                matterExercise,
                matterType,
                originType,
                showOnSite,
                votationType,
                matterDescription,
                matterBody,
                matterJustification,
                matterCompleteText,
                JSON.stringify(origin),
                JSON.stringify(agentVotation),
                file,
                IDsessao,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //delete uma matéria
    deleteMatter(req, res) {
        const id = parseInt(req.params.id);
        const deleteMatter = `DELETE FROM matter WHERE ID = ?`;

        connection.query(deleteMatter, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir matéria', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}