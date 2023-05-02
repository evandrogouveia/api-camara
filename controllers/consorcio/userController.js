const connection = require('../../database/connection');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {

    //register
    async register(req, res) {
        const email = req.body.email;
        const senha = req.body.senha;

        const salt = await bcrypt.genSalt(10);
        const hash_senha = await bcrypt.hash(senha, salt);

        const checkEmail = `SELECT email FROM users_consorcio WHERE email = ?`;

        connection.query(checkEmail, [email], function (error, results, fields) {
            if (!results.length) {

                const newUser = `INSERT INTO users_consorcio(
                        email,
                        senha
                    ) VALUES(
                        '${email}',
                        '${hash_senha}'
                    )`;

                connection.query(newUser, [], function (error, resultsRegister, fields) {
                    if (error) {
                        res.json(error);
                    } else {
                        const user = `SELECT * FROM users_consorcio WHERE email = ?`;
                        connection.query(user, [email], async function (error, resultsUsr, fields) {

                            if (resultsUsr.length > 0) {

                                token = jwt.sign({ data: resultsUsr }, 'secret', { expiresIn: "1d" });

                                const { senha, hash_senha, ...data } = resultsUsr[0];

                                res.status(200).json({ status: 1, message: 'Registrado', data: data, token: token });
                            }
                        });
                    }
                });

            } else {
                res.status(400).json({ status: 0, message: 'Email já cadastrado, faça login em sua conta', error });
            }
        });
    },

    //login
    async login(req, res) {
        const email = req.body.email;
        const senha = req.body.senha;

        if (email && senha) {
            const user = `SELECT * FROM users_consorcio WHERE email = ?`;

            connection.query(user, [email], async function (error, results, fields) {
                if (results.length > 0) {
                    const dcryptsenha = await bcrypt.compare(senha, results[0].senha);

                    if (dcryptsenha) {
                        token = jwt.sign({ data: results }, 'secret', { expiresIn: "1d" });

                        const { senha, ...data } = results[0];

                        res.status(200).json({ status: 1, message: 'Autenticado', data: data, token: token });
                    } else {
                        res.status(400).json({ status: 0, error: error, message: 'E-mai ou Senha incorretos' });
                    }
                } else {
                    res.status(400).json({ status: 0, error: error, message: 'Não existe conta para o e-mail informado' });
                }
            });
        }
    },

    //getUser
    async getUser(req, res) {
        try {
            jwt.verify(req.headers.authorization, "secret", function (err, decoded) {
                if (decoded) {
                    const { senha, ...data } = decoded.data[0];
                    return res.status(200).json(data);
                } else {
                    return res.status(401).json({ message: 'Não autorizado' });
                }
            });
        } catch (e) {
            return res.status(401).json({ message: 'Não autenticado' });
        }
    },

    //getUserAll
    getUserAll(req, res) {
        const selectUsers = `SELECT * FROM users_consorcio`;
        
        connection.query(selectUsers, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({status: 0, message: 'Erro ao obter usuários', error: error});
            } else {
                res.status(200).json(results);
            }
        });
    },

    //delete user
    async deleteUser(req, res) {
        const deleteUser = 'DELETE FROM users_consorcio WHERE id =' + parseInt(req.params.id);
        connection.query(deleteUser, [parseInt(req.params.id)], function (error, results, fields) {
            if (error) {
                res.json(error);
            } else {
                res.status(200).json({ status: 1, message: 'Usuário deletado!' });
            }
        });
    },

    //logout
    async logout(req, res) {
        const authHeader = req.headers.authorization;

        jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
            if (logout) {
                res.status(200).json({ status: 0, message: 'Deslogou!', token: '' });
            } else {
                res.status(400).json({ message: 'Erro' });
            }
        })
    }

    
}