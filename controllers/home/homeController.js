const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/home`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),

    registerHome(req, res) {
        let dataForm = JSON.parse(req.body.formHome);
        const categories = dataForm.categories;
        let banner1;
        let banner2;
        let banner3;
        let banner4;
        let banner5;

        if (req.files.banner1) { banner1 = `${process.env.BASE_URL}/uploads/home/${req.files.banner1[0]?.filename}` };
        if (req.files.banner2) { banner2 = `${process.env.BASE_URL}/uploads/home/${req.files.banner2[0]?.filename}` };
        if (req.files.banner3) { banner3 = `${process.env.BASE_URL}/uploads/home/${req.files.banner3[0]?.filename}` };
        if (req.files.banner4) { banner4 = `${process.env.BASE_URL}/uploads/home/${req.files.banner4[0]?.filename}` };
        if (req.files.banner5) { banner5 = `${process.env.BASE_URL}/uploads/home/${req.files.banner5[0]?.filename}` };

        const newHome = `INSERT INTO home(
            categories,
            banner1,
            banner2,
            banner3,
            banner4,
            banner5
            ) VALUES (
                '${JSON.stringify(categories)}',
                '${banner1}',
                '${banner2}',
                '${banner3}',
                '${banner4}',
                '${banner5}'
            )`;

        connection.query(newHome, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'dados cadastrado!' });
            }
        });

    },

    getHome(req, res) {
        const selectHome = `SELECT * FROM home`;

        connection.query(selectHome, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    updateHome(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formHome);

        const categories = dataForm.categories;
        let banner1;
        let banner2;
        let banner3;
        let banner4;
        let banner5;

        req.files.banner1 ? banner1 = `${process.env.BASE_URL}/uploads/home/${req.files.banner1[0]?.filename}` : banner1 = dataForm.banner1;
        req.files.banner2 ? banner2 = `${process.env.BASE_URL}/uploads/home/${req.files.banner2[0]?.filename}` : banner2 = dataForm.banner2;
        req.files.banner3 ? banner3 = `${process.env.BASE_URL}/uploads/home/${req.files.banner3[0]?.filename}` : banner3 = dataForm.banner3;
        req.files.banner4 ? banner4 = `${process.env.BASE_URL}/uploads/home/${req.files.banner4[0]?.filename}` : banner4 = dataForm.banner4;
        req.files.banner5 ? banner5 = `${process.env.BASE_URL}/uploads/home/${req.files.banner5[0]?.filename}` : banner5 = dataForm.banner5;

        const updateHome = 'UPDATE `home` SET `banner1`= ?,' +
            '`banner2`= ?,' +
            '`banner3`= ?,' +
            '`banner4`= ?,' +
            '`banner5`= ?,' +
            '`categories`= ?' +
            'WHERE `home`.`ID`= ?';

        connection.query(updateHome, [
            banner1,
            banner2,
            banner3,
            banner4,
            banner5,
            JSON.stringify(categories),
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