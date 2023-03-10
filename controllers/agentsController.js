const connection = require('../database/connection');
const multer = require('multer');
let fs = require('fs-extra');
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/agents`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),

    async newAgent(req, res) {
        let dataForm = JSON.parse(req.body.formAgent);
        const photo = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/agents/${req.files[0]?.filename}` : '';
        const name = dataForm.name;
        const cognam = dataForm.cognam || '';
        const birthDate = dataForm.birthDate || '';
        const email = dataForm.email || '';
        const cpf = dataForm.cpf || '';
        const role = dataForm.role || '';
        const phone = dataForm.phone || '';
        const identityNumber = dataForm.identityNumber || '';
        const identityOrgan = dataForm.identityOrgan || '';
        const identityUf = dataForm.identityUf || '';
        const issuanceDate = dataForm.issuanceDate || '';
        const naturalness = dataForm.naturalness || '';
        const biography = dataForm.biography || '';
        const address = dataForm.address || '';
        const bankDetails = dataForm.bankDetails || '';

        try {
             await s3.putObject({
              Body: JSON.stringify(req.files[0]?.filename),
              Bucket: 'cyclic-ruby-goldfish-robe-sa-east-1',
              Key: req.files[0]?.filename,
            }).promise()
        
        
          } catch (error) {
            if (error.code === 'NoSuchKey') {
              console.log(`No such key ${req.files[0]?.filename}`)
              res.sendStatus(404).end()
            } else {
              console.log(error)
              res.sendStatus(500).end()
            }
          }

        const checkAgentExistis = `SELECT name FROM agents WHERE name = ?`;

        connection.query(checkAgentExistis, [email], function (error, results, fields) {

            if (!results.length) {
                const newAgent = `INSERT INTO agents(
                    photo,
                    name, 
                    cognam,
                    birthDate,
                    email,
                    cpf,
                    role,
                    phone,
                    identityNumber,
                    identityOrgan,
                    identityUf,
                    issuanceDate,
                    naturalness,
                    biography,
                    address,
                    bankDetails
                    ) VALUES (
                        '${photo}',
                        '${name}', 
                        '${cognam}', 
                        '${birthDate}', 
                        '${email}', 
                        '${cpf}', 
                        '${role}', 
                        '${phone}', 
                        '${identityNumber}', 
                        '${identityOrgan}',
                        '${identityUf}',
                        '${issuanceDate}',
                        '${naturalness}',
                        '${biography}',
                        '${JSON.stringify(address)}',  
                        '${JSON.stringify(bankDetails)}'
                    )`;

                connection.query(newAgent, [], function (error, resultsRegister, fields) {
                    if (error) {
                        res.status(400).json({ status: 0, message: 'Erro ao cadastrar Agente', error: error });
                    } else {
                        res.status(200).json({ status: 1, message: 'Agente cadastrado!' });
                    }
                });
            } else {
                res.status(400).json({ status: 0, message: 'Agente já cadastrado', error: error });
            }

        });
    },

    updateAgent(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formAgent);
        const photo = req.files[0]?.filename ? `${process.env.BASE_URL}/uploads/agents/${req.files[0]?.filename}` : dataForm.photo;
        const name = dataForm.name;
        const cognam = dataForm.cognam || '';
        const birthDate = dataForm.birthDate || '';
        const email = dataForm.email || '';
        const cpf = dataForm.cpf || '';
        const role = dataForm.role || '';
        const phone = dataForm.phone || '';
        const identityNumber = dataForm.identityNumber || '';
        const identityOrgan = dataForm.identityOrgan || '';
        const identityUf = dataForm.identityUf || '';
        const issuanceDate = dataForm.issuanceDate || '';
        const naturalness = dataForm.naturalness || '';
        const biography = dataForm.biography || '';
        const address = dataForm.address || '';
        const bankDetails = dataForm.bankDetails || '';

        const updateAgent = 'UPDATE `agents` SET `photo`= ?,' +
            '`name`= ?,' +
            '`cognam`= ?,' +
            '`birthDate`= ?,' +
            '`email`= ?,' +
            '`cpf`= ?,' +
            '`role`= ?,' +
            '`phone`= ?,' +
            '`identityNumber`= ?,' +
            '`identityOrgan`= ?,' +
            '`identityUf`= ?,' +
            '`issuanceDate`= ?,' +
            '`naturalness`= ?,' +
            '`biography`= ?,' +
            '`address`= ?,' +
            '`bankDetails`= ?' +
            'WHERE `agents`.`ID`= ?';

        connection.query(updateAgent, [
            photo,
            name,
            cognam,
            birthDate,
            email,
            cpf,
            role,
            phone,
            identityNumber,
            identityOrgan,
            identityUf,
            issuanceDate,
            naturalness,
            biography,
            JSON.stringify(address),
            JSON.stringify(bankDetails),
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar agente', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Agente atualizado!' });
            }
        });
    },

    getAgents(re, res) {
        const selectAgents = `SELECT * FROM agents ORDER BY name`;

        connection.query(selectAgents, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter agentes', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    deleteAgent(req, res) {
        const id = parseInt(req.params.id);
        const deleteAgent = `DELETE FROM agents WHERE ID = ?`;

        connection.query(deleteAgent, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir agente', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}