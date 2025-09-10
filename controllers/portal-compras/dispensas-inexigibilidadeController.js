const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/dispensaInexigibilidade/`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),


    newDispensaInexigibilidade(req, res) {
        let dataForm = JSON.parse(req.body.formDispensasInexigibilidade);
        
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

        const titulo = dataForm.titulo;
        const exercicio = dataForm.exercicio;
        const numeroLicitacao = dataForm.numeroLicitacao || '';
        const modalidate = dataForm.modalidate || '';
        const tipo = dataForm.tipo || '';
        const dataAbertura = dataForm.dataAbertura || '';
        const dataDivulgacaoExtrato = dataForm.dataDivulgacaoExtrato || '';
        const dataRatificacao = dataForm.dataRatificacao || '';
        const dataDivulgacaoRatificacao = dataForm.dataDivulgacaoRatificacao || '';
        const valorEstimado = dataForm.valorEstimado || '';
        const descricao = dataForm.descricao || '';
        const motivoOrigem = dataForm.motivoOrigem || '';
        const justificativaPreco = dataForm.justificativaPreco || '';
        const fundamentacaoLegal = dataForm.fundamentacaoLegal || '';
        const formasPublicacao = dataForm.formasPublicacao || '';
        const responsaveis = dataForm.responsaveis || '';
        const orgaos = dataForm.orgaos || '';
        const participantes = dataForm.participantes || '';
        const presidenteComissao = dataForm.presidenteComissao || '';
        const responsavelInformacao = dataForm.responsavelInformacao || '';
        const responsavelTecnicoJuridico = dataForm.responsavelTecnicoJuridico || '';
        const responsavelAdjudicao = dataForm.responsavelAdjudicao || '';
        const responsavelHomologacao = dataForm.responsavelHomologacao || '';

        const newDispensaInexigibilidade = `INSERT INTO dispensasInexigibilidade(
            titulo,
            exercicio,
            numeroLicitacao,
            modalidate,
            tipo,
            dataAbertura,
            dataDivulgacaoExtrato,
            dataRatificacao,
            dataDivulgacaoRatificacao,
            valorEstimado,
            descricao,
            motivoOrigem,
            justificativaPreco,
            fundamentacaoLegal,
            files,
            formasPublicacao,
            responsaveis,
            orgaos,
            participantes,
            presidenteComissao,
            responsavelInformacao,
            responsavelTecnicoJuridico,
            responsavelAdjudicao,
            responsavelHomologacao 
            ) VALUES (
                '${titulo}',
                '${exercicio}',
                '${numeroLicitacao}', 
                '${modalidate}', 
                '${tipo}',
                '${dataAbertura}',
                '${dataDivulgacaoExtrato}',
                '${dataRatificacao}',
                '${dataDivulgacaoRatificacao}',
                '${valorEstimado}',
                '${descricao}',
                '${motivoOrigem}',
                '${justificativaPreco}',
                '${fundamentacaoLegal}',
                '${JSON.stringify(files)}',
                '${JSON.stringify(formasPublicacao)}',
                '${responsaveis}',
                '${JSON.stringify(orgaos)}',
                '${JSON.stringify(participantes)}',
                '${presidenteComissao}',
                '${responsavelInformacao}',
                '${responsavelTecnicoJuridico}',
                '${responsavelAdjudicao}',
                '${responsavelHomologacao}'
            )`;

        connection.query(newDispensaInexigibilidade, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    getAllDispensaInexigibilidade(req, res) {
        const selectDispensaInexigibilidade = `SELECT * FROM dispensasInexigibilidade ORDER BY dataAbertura DESC`;

        connection.query(selectDispensaInexigibilidade, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getSearchDispensaInexigibilidade(req, res) {
        const term = req.query.term[0];

        const selectDispensaInexigibilidade = `SELECT * FROM dispensasInexigibilidade WHERE 
        LOWER(dispensasInexigibilidade.descricao) LIKE LOWER('%${term}%') OR
        LOWER(dispensasInexigibilidade.titulo) LIKE LOWER('%${term}%') OR
        LOWER(dispensasInexigibilidade.numeroLicitacao) LIKE LOWER('%${term}%') OR
        LOWER(dispensasInexigibilidade.dataAbertura) LIKE LOWER('%${term}%')
        `;

        connection.query(selectDispensaInexigibilidade, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    updateDispensaInexigibilidade(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formDispensasInexigibilidade);

        const arrayFile = [];
        for (const file of req.files) {
            arrayFile.push(`${process.env.BASE_URL}/uploads/dispensaInexigibilidade/${file?.filename}`)
        }

        const titulo = dataForm.titulo;
        const exercicio = dataForm.exercicio;
        const numeroLicitacao = dataForm.numeroLicitacao || '';
        const modalidate = dataForm.modalidate || '';
        const tipo = dataForm.tipo || '';
        const dataAbertura = dataForm.dataAbertura || '';
        const dataDivulgacaoExtrato = dataForm.dataDivulgacaoExtrato || '';
        const dataRatificacao = dataForm.dataRatificacao || '';
        const dataDivulgacaoRatificacao = dataForm.dataDivulgacaoRatificacao || '';
        const valorEstimado = dataForm.valorEstimado || '';
        const descricao = dataForm.descricao || '';
        const motivoOrigem = dataForm.motivoOrigem || '';
        const justificativaPreco = dataForm.justificativaPreco || '';
        const fundamentacaoLegal = dataForm.fundamentacaoLegal || '';
        const files = arrayFile;
        const formasPublicacao = dataForm.formasPublicacao || '';
        const responsaveis = dataForm.responsaveis || '';
        const orgaos = dataForm.orgaos || '';
        const participantes = dataForm.participantes || '';
        const presidenteComissao = dataForm.presidenteComissao || '';
        const responsavelInformacao = dataForm.responsavelInformacao || '';
        const responsavelTecnicoJuridico = dataForm.responsavelTecnicoJuridico || '';
        const responsavelAdjudicao = dataForm.responsavelAdjudicao || '';
        const responsavelHomologacao = dataForm.responsavelHomologacao || '';

        const updateDispensaInexigibilidade = 'UPDATE `dispensasInexigibilidade` SET `titulo`= ?,' +
            '`exercicio`= ?,' +
            '`numeroLicitacao`= ?,' +
            '`modalidate`= ?,' +
            '`tipo`= ?,' +
            '`dataAbertura`= ?,' +
            '`dataDivulgacaoExtrato`= ?,' +
            '`dataRatificacao`= ?,' +
            '`dataDivulgacaoRatificacao`= ?,' +
            '`valorEstimado`= ?,' +
            '`descricao`= ?,' +
            '`motivoOrigem`= ?,' +
            '`justificativaPreco`= ?,' +
            '`fundamentacaoLegal`= ?,' +
            '`files`= ?,' +
            '`formasPublicacao`= ?,' +
            '`responsaveis`= ?,' +
            '`orgaos`= ?,' +
            '`participantes`= ?,' +
            '`presidenteComissao`= ?,' +
            '`responsavelInformacao`= ?,' +
            '`responsavelTecnicoJuridico`= ?,' +
            '`responsavelAdjudicao`= ?,' +
            '`responsavelHomologacao`= ?' +
            'WHERE `dispensasInexigibilidade`.`ID`= ?';

        connection.query(updateDispensaInexigibilidade, [
            titulo,
            exercicio,
            numeroLicitacao,
            modalidate,
            tipo,
            dataAbertura,
            dataDivulgacaoExtrato,
            dataRatificacao,
            dataDivulgacaoRatificacao,
            valorEstimado,
            descricao,
            motivoOrigem,
            justificativaPreco,
            fundamentacaoLegal,
            JSON.stringify(files),
            JSON.stringify(formasPublicacao),
            responsaveis,
            JSON.stringify(orgaos),
            JSON.stringify(participantes),
            presidenteComissao,
            responsavelInformacao,
            responsavelTecnicoJuridico,
            responsavelAdjudicao,
            responsavelHomologacao,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: 'Erro ao atualizar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'Dados atualizado!' });
            }
        });
    },

    deleteDispensaInexigibilidade(req, res) {
        const id = parseInt(req.params.id);
        const deleteDispensaInexigibilidade = `DELETE FROM dispensasInexigibilidade WHERE ID = ?`;

        connection.query(deleteDispensaInexigibilidade, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}