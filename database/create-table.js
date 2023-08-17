const mysql = require('mysql2');

const pool = mysql.createPool({
    multipleStatements: true,
    host: '185.169.99.137',
    port: '3306',
    user: 'ce180037_camara',
    password: '*QzBtlN^1^qZ',
    database: 'ce180037_camara',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

pool.getConnection(function (err) {
    if (err) return console.log(err);
    console.log('conectou');
    createTable(pool);
});

function createTable(conn) {

    /* CRIAR TABELA DE CARGOS*/
    const sqlRoles = "CREATE TABLE IF NOT EXISTS roles (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "description varchar(150) NOT NULL,\n" +
        "symbology varchar(150),\n" +
        "exerciseSchedule varchar(50),\n" +
        "serviceLocation varchar(50),\n" +
        "jobAttributes varchar(20),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE AGENTE PÚBLICO */
    const sqlAgents = "CREATE TABLE IF NOT EXISTS agents (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "photo varchar(150),\n" +
        "name varchar(150) NOT NULL,\n" +
        "cognam varchar(50) NOT NULL,\n" +
        "birthDate varchar(20),\n" +
        "email varchar(50) NOT NULL,\n" +
        "cpf varchar(50),\n" +
        "role varchar(50) NOT NULL,\n" +
        "phone varchar(20),\n" +
        "identityNumber varchar(50),\n" +
        "identityOrgan varchar(50),\n" +
        "identityUf varchar(50),\n" +
        "issuanceDate varchar(50),\n" +
        "naturalness varchar(50),\n" +
        "biography varchar(50),\n" +
        "address JSON,\n" +
        "bankDetails JSON,\n" +
        "party JSON,\n" +
        "type varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE CATEGORIAS DE NOTÍCIAS*/
    const sqlNewsCategory = "CREATE TABLE IF NOT EXISTS newsCategory (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "name varchar(150) NOT NULL,\n" +
        "description varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE NOTÍCIAS*/
    const sqlNews = "CREATE TABLE IF NOT EXISTS news (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "title varchar(250) NOT NULL,\n" +
        "subtitle varchar(450),\n" +
        "highlightedImage varchar(150),\n" +
        "description varchar(6000),\n" +
        "categories JSON,\n" +
        "publicationDate varchar(150),\n" +
        "views int,\n" +
        "author varchar(150),\n" +
        "comments JSON,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DA CAMARA*/
    const sqlCamara = "CREATE TABLE IF NOT EXISTS camara (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "name varchar(150),\n" +
        "email varchar(150),\n" +
        "phone varchar(50),\n" +
        "schedule varchar(150),\n" +
        "plenary varchar(150),\n" +
        "slogan varchar(150),\n" +
        "qtdAlderman INT,\n" +
        "qtdPopulation INT,\n" +
        "address JSON,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DA TRANSPARÊNCIA*/
    const sqlTransparency = "CREATE TABLE IF NOT EXISTS transparency (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "title varchar(150),\n" +
        "subTitle varchar(150),\n" +
        "description varchar(250),\n" +
        "section1 JSON,\n" +
        "section2 JSON,\n" +
        "section3 JSON,\n" +
        "section4 JSON,\n" +
        "section5 JSON,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE PARTIDOS*/
    const sqlParties = "CREATE TABLE IF NOT EXISTS parties (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "acronym varchar(50) NOT NULL,\n" +
        "description varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE TIPOS DE VOTAÇÃO*/
    const sqlTypeVote = "CREATE TABLE IF NOT EXISTS typevote (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "description varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE TIPO DE MATÉRIA*/
    const sqlTypeMatter = "CREATE TABLE IF NOT EXISTS typematter (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "description varchar(6000),\n" +
        "acronym varchar(150),\n" +
        "hasVote varchar(50),\n" +
        "typeVote varchar(150),\n" +
        "president varchar(50),\n" +
        "alderman varchar(50),\n" +
        "boardDirectors varchar(50),\n" +
        "commissions varchar(50),\n" +
        "executive varchar(50),\n" +
        "popularInitiative varchar(50),\n" +
        "others varchar(50),\n" +
        "hasRecipient varchar(50),\n" +
        "hasProcessing varchar(50),\n" +
        "hasEmendamentType varchar(50),\n" +
        "hasBindings varchar(50),\n" +
        "initialBody varchar(250),\n" +
        "explanatory varchar(250),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE TIPOS DE SESSÃO*/
    const sqlTypeSession = "CREATE TABLE IF NOT EXISTS typesession (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "description varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE TIPOS DE EMENDA*/
    const sqlTypeAmendment = "CREATE TABLE IF NOT EXISTS typeamendment (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "description varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE TIPO DE FASE*/
    const sqlTypePhase = "CREATE TABLE IF NOT EXISTS typephase (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "description varchar(200),\n" +
        "withAgent varchar(20),\n" +
        "withComission varchar(20),\n" +
        "withSession varchar(20),\n" +
        "withReceiver varchar(20),\n" +
        "withCraft varchar(20),\n" +
        "withMatter varchar(20),\n" +
        "withPublications varchar(20),\n" +
        "explanationText varchar(500),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE TIPOS DE SITUAÇÃO*/
    const sqlTypeSituation = "CREATE TABLE IF NOT EXISTS typesituation(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "description varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE MATÉRIA*/
    const sqlMatter = "CREATE TABLE IF NOT EXISTS matter (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "matterDate varchar(50),\n" +
        "matterNumber varchar(20),\n" +
        "matterExercise varchar(50),\n" +
        "matterType varchar(50),\n" +
        "originType varchar(50),\n" +
        "showOnSite varchar(20),\n" +
        "votationType varchar(50),\n" +
        "matterDescription varchar(6000),\n" +
        "matterBody varchar(600),\n" +
        "matterJustification varchar(600),\n" +
        "matterCompleteText varchar(6000),\n" +
        "origin JSON,\n" +
        "agentVotation JSON,\n" +
        "file varchar(200),\n" +
        "IDsessao int,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";


    /* CRIAR TABELA DE TIPODS DE EXPEDIENTE*/
    const sqlOfficeHour = "CREATE TABLE IF NOT EXISTS typeofficehour (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "description varchar(150),\n" +
        "category varchar(100),\n" +
        "readingVoting varchar(50),\n" +
        "tribuneTime varchar(20),\n" +
        "timeApart varchar(20),\n" +
        "auxiliaryTitle varchar(500),\n" +
        "regiment varchar(500),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";


    /* CRIAR TABELA DE TIPOS DE PUBLICAÇÕES*/
    const sqlTypesPublications = "CREATE TABLE IF NOT EXISTS typepublication (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "description varchar(150),\n" +
        "acronym varchar(50),\n" +
        "quantity varchar(20),\n" +
        "category varchar(150),\n" +
        "characteristic varchar(200),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";


    /* CRIAR TABELA DE PROCEDURES */
    const sqlProcedures = "CREATE TABLE IF NOT EXISTS procedures (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "ruling varchar(150),\n" +
        "procedureDate varchar(50),\n" +
        "phase varchar(150),\n" +
        "situation varchar(150),\n" +
        "session varchar(200),\n" +
        "officeHour varchar(150),\n" +
        "observation varchar(500),\n" +
        "matterID int,\n" +
        "PRIMARY KEY (ID),\n" +
        "FOREIGN KEY (matterID) REFERENCES matter(ID)\n" +
        ");";


    /* CRIAR TABELA DE TRAMITAÇÔES*/
    const sqlSessions = "CREATE TABLE IF NOT EXISTS sessions (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "date varchar(50),\n" +
        "hour varchar(20),\n" +
        "number varchar(50),\n" +
        "exercise varchar(50),\n" +
        "status varchar(50),\n" +
        "typeSession varchar(150),\n" +
        "siteShow varchar(20),\n" +
        "virtualSession varchar(20),\n" +
        "callAldermans JSON,\n" +
        "legislature varchar(150),\n" +
        "description varchar(650),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DO HEADER*/
    const sqlHeader = "CREATE TABLE IF NOT EXISTS header(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "logo varchar(200),\n" +
        "background varchar(200),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DA HOME*/
    const sqlHome = "CREATE TABLE IF NOT EXISTS home(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "banner1 varchar(200),\n" +
        "banner2 varchar(200),\n" +
        "banner3 varchar(200),\n" +
        "banner4 varchar(200),\n" +
        "banner5 varchar(200),\n" +
        "categories JSON,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE VÍDEOS*/
    const sqlVideos = "CREATE TABLE IF NOT EXISTS videos (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "title varchar(150) NOT NULL,\n" +
        "link varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";


    /* CRIAR TABELA DE LRF*/
    const sqlLrf = "CREATE TABLE IF NOT EXISTS lrf(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "typeFile varchar(150),\n" +
        "date varchar(50),\n" +
        "exercise varchar(50),\n" +
        "secretary varchar(150),\n" +
        "competence varchar(150),\n" +
        "file varchar(200),\n" +
        "description varchar(5000),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE LEIS*/
    const sqlLeis = "CREATE TABLE IF NOT EXISTS leis(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "typeFile varchar(150),\n" +
        "date varchar(50),\n" +
        "exercise varchar(50),\n" +
        "number int,\n" +
        "file varchar(200),\n" +
        "description varchar(5000),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE USUÁRIOS */
    const sqlUsersCamara = "CREATE TABLE IF NOT EXISTS users_camara (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "email varchar(50),\n" +
        "senha varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE EDIÇÃO DO FOOTER */
    const sqlEditFooter = "CREATE TABLE IF NOT EXISTS footer (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "logo varchar(200),\n" +
        "linkFacebook varchar(200),\n" +
        "linkEmail varchar(200),\n" +
        "linkYoutube varchar(200),\n" +
        "linkInstagram varchar(200),\n" +
        "presidente varchar(250),\n" +
        "cnpj varchar(200),\n" +
        "telefone varchar(50),\n" +
        "email varchar(150),\n" +
        "endereco varchar(600),\n" +
        "horario varchar(600),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE CONTRATOS */
    const sqlContracts = "CREATE TABLE IF NOT EXISTS contracts (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "modality varchar(150),\n" +
        "number varchar(200),\n" +
        "date varchar(50),\n" +
        "exercise varchar(50),\n" +
        "hiredName varchar(600),\n" +
        "cpfCnpj varchar(100),\n" +
        "validity JSON,\n" +
        "globalValue varchar(250),\n" +
        "monthlyValue varchar(250),\n" +
        "secretary varchar(250),\n" +
        "file varchar(250),\n" +
        "description varchar(6000),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE LICITAÇÕES */
    const sqlLicitacoes = "CREATE TABLE IF NOT EXISTS licitacoes(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "title varchar(150),\n" +
        "processNumber varchar(150),\n" +
        "type varchar(150),\n" +
        "openingDate varchar(50),\n" +
        "publicationDate varchar(50),\n" +
        "estimatedValue varchar(150),\n" +
        "description varchar(6000),\n" +
        "files JSON,\n" +
        "comissionPresident varchar(200),\n" +
        "responsibleInformin varchar(200),\n" +
        "responsibleTecnicalOpinion varchar(200),\n" +
        "responsibleAward varchar(200),\n" +
        "responsibleHomologation varchar(200),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE ANDAMENTO LICITAÇÃO */
    const sqlProgress = "CREATE TABLE IF NOT EXISTS progress(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "licitacaoID int,\n" +
        "date varchar(50),\n" +
        "hour varchar(50),\n" +
        "phase varchar(150),\n" +
        "situation varchar(150),\n" +
        "responsible varchar(150),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE PCSG*/
    const sqlPcsg = "CREATE TABLE IF NOT EXISTS pcsg(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "date varchar(50),\n" +
        "exercise varchar(50),\n" +
        "period JSON,\n" +
        "agent varchar(250),\n" +
        "secretary varchar(250),\n" +
        "file varchar(250),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    const novaColunaContratos = "ALTER TABLE contracts ADD COLUMN IDlicitacao VARCHAR(50) AFTER description";
    const novaColunaLicitacoes = "ALTER TABLE licitacoes ADD COLUMN exercise VARCHAR(150) AFTER title";
    const novaColunaAgents = "ALTER TABLE agents ADD COLUMN type VARCHAR(150) AFTER party";

    /* CRIAR TABELA DE RGI*/
    const sqlRgi = "CREATE TABLE IF NOT EXISTS rgi(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "typeFile varchar(150),\n" +
        "date varchar(50),\n" +
        "exercise varchar(50),\n" +
        "number int,\n" +
        "secretary varchar(250),\n" +
        "file varchar(200),\n" +
        "description varchar(5000),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE LEI ORGÂNICA*/
    const sqlLeiOrganica = "CREATE TABLE IF NOT EXISTS leiOrganica(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "typeFile varchar(150),\n" +
        "date varchar(50),\n" +
        "exercise varchar(50),\n" +
        "number int,\n" +
        "secretary varchar(250),\n" +
        "file varchar(200),\n" +
        "description varchar(5000),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE DIÁRIAS*/
    const sqlDiarias = "CREATE TABLE IF NOT EXISTS diarias(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "date varchar(50),\n" +
        "exercise varchar(50),\n" +
        "number varchar(150),\n" +
        "agent JSON,\n" +
        "company varchar(250),\n" +
        "city varchar(250),\n" +
        "uf varchar(20),\n" +
        "tripStart varchar(50),\n" +
        "tripEnd varchar(50),\n" +
        "quitationDate varchar(50),\n" +
        "secretary varchar(250),\n" +
        "quantity varchar(150),\n" +
        "unitValue varchar(150),\n" +
        "totalValue varchar(150),\n" +
        "file varchar(250),\n" +
        "description varchar(6000),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";


    /* CRIAR TABELA DE DECRETOS*/
    const sqlDecretos = "CREATE TABLE IF NOT EXISTS decretos(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "typeFile varchar(150),\n" +
        "date varchar(50),\n" +
        "exercise varchar(50),\n" +
        "number varchar(150),\n" +
        "secretary varchar(150),\n" +
        "competence varchar(150),\n" +
        "file varchar(200),\n" +
        "description varchar(5000),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    /* CRIAR TABELA DE PORTARIAS*/
    const sqlPortarias = "CREATE TABLE IF NOT EXISTS portarias(\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "typeFile varchar(150),\n" +
        "date varchar(50),\n" +
        "exercise varchar(50),\n" +
        "number varchar(150),\n" +
        "agent varchar(150),\n" +
        "secretary varchar(150),\n" +
        "file varchar(200),\n" +
        "description varchar(5000),\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    const novaColunaDecretos = "ALTER TABLE decretos ADD COLUMN number VARCHAR(150) AFTER exercise";

     /* CRIAR TABELA DE SERVIDORES */
     const sqlServidores = "CREATE TABLE IF NOT EXISTS servidores (\n" +
     "ID int NOT NULL AUTO_INCREMENT,\n" +
     "nome varchar(250),\n" +
     "cargo varchar(150),\n" +
     "PRIMARY KEY (ID)\n" +
     ");";

     const novaColunaUsersCamara = "ALTER TABLE users_camara ADD COLUMN agentId VARCHAR(150) AFTER ID";

    conn.query(sqlMatter, function (error, results, fields) {
        if (error) return console.log(error);
        console.log('criou a tabela');
        pool.end();
    });

}