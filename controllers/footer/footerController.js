const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/footer`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),

    registerFooter(req, res) {
        let dataForm = JSON.parse(req.body.formFooter);
    
        let logo;
        const linkFacebook = dataForm.linkFacebook;
        const linkEmail = dataForm.linkEmail;
        const linkYoutube = dataForm.linkYoutube;
        const linkInstagram = dataForm.linkInstagram;
        const presidente = dataForm.presidente;
        const cnpj = dataForm.cnpj;
        const telefone = dataForm.telefone;
        const email = dataForm.email;
        const endereco = dataForm.endereco;
        const horario = dataForm.horario;

        if (req.files.logo) { logo = `${process.env.BASE_URL}/uploads/footer/${req.files.logo[0]?.filename}`; }

        const newFooter = `INSERT INTO footer(
            logo,
            linkFacebook,
            linkEmail,
            linkYoutube,
            linkInstagram,
            presidente,
            cnpj,
            telefone,
            email,
            endereco,
            horario
            ) VALUES (
                '${logo}',
                '${linkFacebook}',
                '${linkEmail}',
                '${linkYoutube}',
                '${linkInstagram}',
                '${presidente}',
                '${cnpj}',
                '${telefone}',
                '${email}',
                '${endereco}',
                '${horario}'
            )`;

        connection.query(newFooter, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'dados cadastrado!' });
            }
        });

    },

    getFooter(req, res) {
        const selectFooter = `SELECT * FROM footer`;

        connection.query(selectFooter, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    updateFooter(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formFooter);
    
        let logo;
        const linkFacebook = dataForm.linkFacebook;
        const linkEmail = dataForm.linkEmail;
        const linkYoutube = dataForm.linkYoutube;
        const linkInstagram = dataForm.linkInstagram;
        const presidente = dataForm.presidente;
        const cnpj = dataForm.cnpj;
        const telefone = dataForm.telefone;
        const email = dataForm.email;
        const endereco = dataForm.endereco;
        const horario = dataForm.horario;

        req.files.logo ? logo = `${process.env.BASE_URL}/uploads/footer/${req.files.logo[0]?.filename}` : logo = dataForm.logo;


        const updateHome = 'UPDATE `footer` SET `logo`= ?,' +
            '`linkFacebook`= ?,' +
            '`linkEmail`= ?,' +
            '`linkYoutube`= ?,' +
            '`linkInstagram`= ?,' +
            '`presidente`= ?,' +
            '`cnpj`= ?,' +
            '`telefone`= ?,' +
            '`email`= ?,' +
            '`endereco`= ?,' +
            '`horario`= ?' +
            'WHERE `footer`.`ID`= ?';

        connection.query(updateHome, [
             logo,
             linkFacebook,
             linkEmail,
             linkYoutube,
             linkInstagram,
             presidente,
             cnpj,
             telefone,
             email,
             endereco,
             horario,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao atualizar dados', error: error });
            } else {
                res.status(200).json({ status: 0, message: 'Dados atualizado!' });
            }
        });
    }

}