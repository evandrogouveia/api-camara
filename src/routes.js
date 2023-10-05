
const multer = require('multer');
const authController = require('../controllers/login/authController');
const headerController = require('../controllers/header/headerController');
const homeController = require('../controllers/home/homeController');
const userController = require('../controllers/login/userController');
const matterController = require('../controllers/matter/matterController');
const proceduresController = require('../controllers/matter/proceduresController');
const sessionController = require('../controllers/matter/sessionController');
const typeAmendmentController = require('../controllers/matter/typeAmendmentController');
const typeMatterController = require('../controllers/matter/typeMatterController');
const typeOfficeHourController = require('../controllers/matter/typeOfficeHourController');
const typePhaseController = require('../controllers/matter/typePhaseController');
const typePublicationsController = require('../controllers/matter/typePublicationsController');
const typeSessionController = require('../controllers/matter/typeSessionController');
const typeSituationController = require('../controllers/matter/typeSituationController');
const typeVoteController = require('../controllers/matter/typeVoteController');
const agentsController = require('../controllers/municipal-information/agentsController');
const camaraController = require('../controllers/municipal-information/camaraController');
const partiesController = require('../controllers/municipal-information/partiesController');
const rolesController = require('../controllers/municipal-information/rolesController');
const newsCategoryController = require('../controllers/news/newsCategoryController');
const newsController = require('../controllers/news/newsController');
const leisController = require('../controllers/publications-ordinances-daily/leisController');
const lrfController = require('../controllers/publications-ordinances-daily/lrfController');
const transparencyController = require('../controllers/transparencyController');
const videosController = require('../controllers/videos/videosController');
const footerController = require('../controllers/footer/footerController');
const contratosController = require('../controllers/contratos-licitacoes/contratosController');
const licitacoesController = require('../controllers/contratos-licitacoes/licitacoesController');
const andamentoController = require('../controllers/contratos-licitacoes/andamentoController');
const pcsgController = require('../controllers/publications-ordinances-daily/pcsgController');
const rgiController = require('../controllers/publications-ordinances-daily/rgiController');
const leiOrganicaController = require('../controllers/publications-ordinances-daily/leiOrganicaController');
const diariasController = require('../controllers/publications-ordinances-daily/diariasController');
const decretosController = require('../controllers/publications-ordinances-daily/decretosController');
const portariasController = require('../controllers/publications-ordinances-daily/portariasController');
const servidoresController = require('../controllers/publications-ordinances-daily/servidoresController');
const configuracoes = require('../controllers/painel-votacao/configuracoes');
const router = require('express').Router();


router.get('/', (req, res) => {});

/*--------------------------- ROTAS DE CARGOS ---------------------------*/
//adiciona um novo cargo
router.post('/new-role', rolesController.newRole);
//obtem todos os cargos
router.get('/all-roles', rolesController.getRoles);
//atualiza o cargo
router.patch('/update-role/:id', rolesController.updateRole);
//deleta o cargo
router.delete('/delete-role/:id', rolesController.deleteRole);


/*--------------------------- ROTAS DE AGENTES ---------------------------*/
//adiciona um novo agente
router.post('/new-agent', multer(agentsController).array('file'), agentsController.newAgent);
//obtem todos os agentes
router.get('/all-agents', agentsController.getAgents);
//atualiza o agente
router.patch('/update-agent/:id', multer(agentsController).array('file'), agentsController.updateAgent);
//deleta o agente
router.delete('/delete-agent/:id', agentsController.deleteAgent);

/*--------------------------- ROTAS DE CATEGORIAS DE NOTÍCIAS ---------------------------*/
//adiciona uma nova categoria
router.post('/new-category', newsCategoryController.newCategory);
//obtem todos as categorias
router.get('/all-categories', newsCategoryController.getCategories);
//atualiza a categoria
router.patch('/update-category/:id', newsCategoryController.updateCategory);
//deleta a categpria
router.delete('/delete-category/:id', newsCategoryController.deleteCategory);

/*--------------------------- ROTAS DE NOTÍCIAS ---------------------------*/
//adiciona uma nova noticia
router.post('/new-news', multer(newsController).array('file'), newsController.newNews);
//obtem todos as noticias
router.get('/all-news', newsController.getNews);
//atualiza a noticia
router.patch('/update-news/:id', multer(newsController).array('file'), newsController.updateNews);
//deleta a noticia
router.delete('/delete-news/:id', newsController.deleteNews);

/*--------------------------- ROTAS DE CAMARA ---------------------------*/
//adiciona dados da camara
router.post('/new-camara', camaraController.newCamara);
//obtem dados da camara
router.get('/all-camara', camaraController.getCamara);
//atualiza dados da camara
router.patch('/update-camara/:id', camaraController.updateCamara);

/*--------------------------- ROTAS DE TRANSPARÊNCIA ---------------------------*/
//adiciona dados da transparencia
router.post('/new-transparency', transparencyController.newTransparency);
//obtem dados da transparencia
router.get('/all-transparency', transparencyController.getTransparency);
//atualiza dados da transparencia
router.patch('/update-transparency/:id', transparencyController.updateTransparency);

/*--------------------------- ROTAS DE PARTIDOS ---------------------------*/
//adiciona uma nova partido
router.post('/new-party', partiesController.newParty);
//obtem todos as partidos
router.get('/all-parties', partiesController.getParties);
//atualiza a partido
router.patch('/update-party/:id', partiesController.updateParty);
//deleta a categpria
router.delete('/delete-party/:id', partiesController.deleteParty);

/*--------------------------- ROTAS DE MATÉRIA ---------------------------*/
//adiciona uma nova matéria
router.post('/new-matter', multer(matterController).array('file'), matterController.newMatter);
//obtem todos as matérias
router.get('/all-matter', matterController.getAllMatter);
//atualiza a matéria
router.patch('/update-matter/:id', multer(matterController).array('file'), matterController.updateMatter);
//deleta a matéria
router.delete('/delete-matter/:id', matterController.deleteMatter);

/*--------------------------- ROTAS SESSÃO---------------------------*/
//adiciona uma nova sessão
router.post('/new-session', sessionController.newSession);
//obtem todos as sessãos
router.get('/all-session', sessionController.getAllSessions);
//obtem sessoes limitadas
router.get('/all-session-limited', sessionController.getSessionsLimited);
//atualiza a sessão
router.patch('/update-session/:id', sessionController.updateSession);
//deleta a sessão
router.delete('/delete-session/:id', sessionController.deleteSession);

/*--------------------------- ROTAS DE TIPOS DE VOTAÇÃO---------------------------*/
//adiciona uma nova partido
router.post('/new-type-vote', typeVoteController.newTypeVote);
//obtem todos as partidos
router.get('/all-type-vote', typeVoteController.getAllTypeVoce);
//atualiza a partido
router.patch('/update-type-vote/:id', typeVoteController.updateTypeVote);
//deleta a categpria
router.delete('/delete-type-vote/:id', typeVoteController.deleteTypeVote);

/*--------------------------- ROTAS DE TIPOS DE MATÉRIA---------------------------*/
//adiciona uma nova materia
router.post('/new-type-matter', typeMatterController.newTypeMatter);
//obtem todos as materias
router.get('/all-type-matter', typeMatterController.getAllTypeMatter);
//atualiza a materia
router.patch('/update-type-matter/:id', typeMatterController.updateTypeMatter);
//deleta a materia
router.delete('/delete-type-matter/:id', typeMatterController.deleteTypeMatter);

/*--------------------------- ROTAS DE TIPOS DE SESSÃO---------------------------*/
//adiciona uma nova sessão
router.post('/new-type-session', typeSessionController.newTypeSession);
//obtem todos as sessãos
router.get('/all-type-session', typeSessionController.getAllTypeSession);
//atualiza a sessão
router.patch('/update-type-session/:id', typeSessionController.updateTypeSession);
//deleta a sessão
router.delete('/delete-type-session/:id', typeSessionController.deleteTypeSession);

/*--------------------------- ROTAS DE TIPOS DE EMENDA---------------------------*/
//adiciona uma nova emenda
router.post('/new-type-amendment', typeAmendmentController.newTypeAmendment);
//obtem todos as emendas
router.get('/all-type-amendment', typeAmendmentController.getAllTypeAmendment);
//atualiza a emenda
router.patch('/update-type-amendment/:id', typeAmendmentController.updateTypeAmendment);
//deleta a emenda
router.delete('/delete-type-amendment/:id', typeAmendmentController.deleteTypeAmendment);

/*--------------------------- ROTAS DE TIPOS DE FASE---------------------------*/
//adiciona uma nova fase
router.post('/new-type-phase', typePhaseController.newTypePhase);
//obtem todos as fases
router.get('/all-type-phase', typePhaseController.getAllTypePhase);
//atualiza a fase
router.patch('/update-type-phase/:id', typePhaseController.updateTypePhase);
//deleta a fase
router.delete('/delete-type-phase/:id', typePhaseController.deleteTypePhase);

/*--------------------------- ROTAS DE TIPOS DE SITUAÇÃO ---------------------------*/
//adiciona uma nova situação
router.post('/new-type-situation', typeSituationController.newTypeSituation);
//obtem todos as situaçãos
router.get('/all-type-situation', typeSituationController.getAllTypeSituation);
//atualiza a situação
router.patch('/update-type-situation/:id', typeSituationController.updateTypeSituation);
//deleta a situação
router.delete('/delete-type-situation/:id', typeSituationController.deleteTypeSituation);

/*--------------------------- ROTAS DE TIPOS DE EXPEDIENTE ---------------------------*/
//adiciona um novo expediente
router.post('/new-type-officeHour', typeOfficeHourController.newTypeOfficeHour);
//obtem todos os tipos de expedientes
router.get('/all-type-officeHour', typeOfficeHourController.getAllTypeOfficeHour);
//atualiza o expediente
router.patch('/update-type-officeHour/:id', typeOfficeHourController.updateTypeOfficeHour);
//deleta o expediente
router.delete('/delete-type-officeHour/:id', typeOfficeHourController.deleteTypeOfficeHour);

/*--------------------------- ROTAS DE TIPOS DE PUBLICAÇÃO ---------------------------*/
//adiciona um novo publication
router.post('/new-type-publications', typePublicationsController.newTypePublication);
//obtem todos os tipos de publications
router.get('/all-type-publications', typePublicationsController.getAllTypePublication);
//atualiza o publication
router.patch('/update-type-publications/:id', typePublicationsController.updateTypePublication);
//deleta o publication
router.delete('/delete-type-publications/:id', typePublicationsController.deleteTypePublication);

/*--------------------------- ROTAS DE TRAMITAÇÔES ---------------------------*/
//adiciona uma nova tramitação
router.post('/new-procedure', proceduresController.newProcedure);
//obtem todas as tramitações
router.get('/all-procedures', proceduresController.getAllProcedures);
//atualiza a tramitação
router.patch('/update-procedure/:id', proceduresController.updateProcedure);
//deleta a tramitação
router.delete('/delete-procedure/:id', proceduresController.deleteProcedure);

/*--------------------------- ROTAS DO HEADER ---------------------------*/
//cadastra o header
router.post('/register-header', multer(headerController).fields([
    {name: 'logo'},
    {name: 'background'},
]), headerController.registerHeader);
//obtem dados do header
router.get('/header', headerController.geHeader);
//atualiza o header
router.patch('/update-header/:id', multer(headerController).fields([
    {name: 'logo'},
    {name: 'background'},
]), headerController.updateHeader);

/*--------------------------- ROTAS DO FOOTER ---------------------------*/
//cadastra o footer
router.post('/register-footer', multer(footerController).fields([{name: 'logo'}]), footerController.registerFooter);
//obtem dados do footer
router.get('/footer', footerController.getFooter);
//atualiza o footer
router.patch('/update-footer/:id', multer(footerController).fields([{name: 'logo'}]), footerController.updateFooter);

/*--------------------------- ROTAS DA HOME ---------------------------*/
//cadastra a home
router.post('/register-home', multer(homeController).fields([
    {name: 'banner1'},
    {name: 'banner2'},
    {name: 'banner3'},
    {name: 'banner4'},
    {name: 'banner5'}
]), homeController.registerHome);
//obtem dados da home
router.get('/home', homeController.getHome);
//atualiza a home
router.patch('/update-home/:id', multer(homeController).fields([
    {name: 'banner1'},
    {name: 'banner2'},
    {name: 'banner3'},
    {name: 'banner4'},
    {name: 'banner5'}
]), homeController.updateHome);

/*--------------------------- ROTAS DE VÌDEOS ---------------------------*/
//adiciona um novo video
router.post('/new-video', videosController.newVideo);
//obtem todos os videos
router.get('/all-videos', videosController.getVideos);
//atualiza o video
router.patch('/update-video/:id', videosController.updateVideo);
//deleta o video
router.delete('/delete-video/:id', videosController.deleteVideo);

/*--------------------------- ROTAS DE LRF ---------------------------*/
//adiciona uma nova LRF
router.post('/new-lrf',  multer(lrfController).array('file'), lrfController.newLrf);
//obtem todas as LRF
router.get('/all-lrf', lrfController.getAllLrf);
//atualiza a LRF
router.patch('/update-lrf/:id', multer(lrfController).array('file'), lrfController.updateLrf);
//deleta a LRF
router.delete('/delete-lrf/:id', lrfController.deleteLrf);

/*--------------------------- ROTAS DE LEIS ---------------------------*/
//adiciona uma nova LEI
router.post('/new-lei',  multer(leisController).array('file'), leisController.newLei);
//obtem todas as LEI
router.get('/all-leis', leisController.getAllLeis);
//atualiza a LEI
router.patch('/update-lei/:id', multer(leisController).array('file'), leisController.updateLei);
//deleta a LEI
router.delete('/delete-lei/:id', leisController.deleteLei);

/*--------------------------- ROTAS DE USUÁRIO ---------------------------*/
//adiciona um novo usuário
router.post('/register', userController.register);
//login do usuário
router.post('/login', userController.login);
//obtem o usuário autenticado
router.get('/user', authController.verifyToken, userController.getUser);
//obtem todos os usuários
router.get('/user-all', userController.getUserAll);
//fazer logout
router.post('/logout', userController.logout);

/*--------------------------- ROTAS DE CONTRATOS ---------------------------*/
//adiciona uma novo contrato
router.post('/new-contract',  multer(contratosController).array('file'), contratosController.newContract);
//obtem todas os contratos
router.get('/all-contracts', contratosController.getAllContracts);
//atualiza o contrato
router.patch('/update-contract/:id', multer(contratosController).array('file'), contratosController.updateContract);
//deleta o contrato
router.delete('/delete-contract/:id', contratosController.deleteContract);

/*--------------------------- ROTAS DE LICITAÇÕES ---------------------------*/
//adiciona uma nova licitacao
router.post('/new-licitacao',  multer(licitacoesController).array('file'), licitacoesController.newLicitacao);
//obtem todas as licitacoes
router.get('/all-licitacoes', licitacoesController.getAllLicitacoes);
//obtem todas as licitacoes conforme busca
router.get('/search-licitacoes', licitacoesController.getSearchLicitacoes)
//atualiza a licitacao
router.patch('/update-licitacao/:id', multer(licitacoesController).array('file'), licitacoesController.updateLicitacao);
//deleta a licitacao
router.delete('/delete-licitacao/:id', licitacoesController.deleteLicitacao);

/*--------------------------- ROTAS DE ANDAMENTO DA LICITAÇÃO ---------------------------*/
//adiciona dados do andamento
router.post('/new-progress', andamentoController.newProgress);
//obtem dados do andamento
router.get('/all-progress', andamentoController.getProgress);

/*--------------------------- ROTAS DE PCSG ---------------------------*/
//adiciona uma nova PCSG
router.post('/new-pcsg',  multer(pcsgController).array('file'), pcsgController.newPcsg);
//obtem todas as PCSG
router.get('/all-pcsg', pcsgController.getAllPcsg);
//atualiza a PCSG
router.patch('/update-pcsg/:id', multer(pcsgController).array('file'), pcsgController.updatePcsg);
//deleta a PCSG
router.delete('/delete-pcsg/:id', pcsgController.deletePcsg);

/*--------------------------- ROTAS DE REGIMENTO INTERNO ---------------------------*/
//adiciona uma nova Rgi
router.post('/new-rgi',  multer(rgiController).array('file'), rgiController.newRgi);
//obtem todas as Rgi
router.get('/all-rgi', rgiController.getAllRgi);
//atualiza a Rgi
router.patch('/update-rgi/:id', multer(rgiController).array('file'), rgiController.updateRgi);
//deleta a Rgi
router.delete('/delete-rgi/:id', rgiController.deleteRgi);

/*--------------------------- ROTAS DE LEI ORGÃNICA ---------------------------*/
//adiciona uma nova lei orgânica
router.post('/new-lei-organica',  multer(leiOrganicaController).array('file'), leiOrganicaController.newLeiOrganica);
//obtem todas as lei orgânica
router.get('/all-lei-organica', leiOrganicaController.getAllLeiOrganica);
//atualiza a lei orgânica
router.patch('/update-lei-organica/:id', multer(leiOrganicaController).array('file'), leiOrganicaController.updateLeiOrganica);
//deleta a lei orgânica
router.delete('/delete-lei-organica/:id', leiOrganicaController.deleteLeiOrganica);

/*--------------------------- ROTAS DE DIÁRIAS ---------------------------*/
//adiciona uma nova diaria
router.post('/new-diaria',  multer(diariasController).array('file'), diariasController.newDiaria);
//obtem todas as diaria
router.get('/all-diarias', diariasController.getAllDiarias);
//atualiza a diaria
router.patch('/update-diaria/:id', multer(diariasController).array('file'), diariasController.updateDiarias);
//deleta a diaria
router.delete('/delete-diaria/:id', diariasController.deleteDiaria);

/*--------------------------- ROTAS DE DECRETOS ---------------------------*/
//adiciona uma nova decreto
router.post('/new-decreto',  multer(decretosController).array('file'), decretosController.newDecreto);
//obtem todas as decreto
router.get('/all-decretos', decretosController.getAllDecretos);
//atualiza a decreto
router.patch('/update-decreto/:id', multer(decretosController).array('file'), decretosController.updateDecreto);
//deleta a decreto
router.delete('/delete-decreto/:id', decretosController.deleteDecreto);

/*--------------------------- ROTAS DE PORTARIAS ---------------------------*/
//adiciona uma nova portaria
router.post('/new-portaria',  multer(portariasController).array('file'), portariasController.newPortaria);
//obtem todas as portaria
router.get('/all-portarias', portariasController.getAllPortarias);
//atualiza a portaria
router.patch('/update-portaria/:id', multer(portariasController).array('file'), portariasController.updatePortaria);
//deleta a portaria
router.delete('/delete-portaria/:id', portariasController.deletePortaria);

/*--------------------------- ROTAS DE SERVIDORES ---------------------------*/
//adiciona um novo servidor
router.post('/new-servidor', servidoresController.newServidor);
//obtem todos os servidores
router.get('/all-servidores', servidoresController.getAllServidores);
//deleta o servidor
router.delete('/delete-servidor/:id', servidoresController.deleteServidor);

/*--------------------------- ROTAS DE CONFIGURAÇÕES ---------------------------*/
//adiciona uma nova configuração
router.post('/new-configuracoes', configuracoes.newConfiguracoes);
//obtem configurações
router.get('/all-configuracoes', configuracoes.getConfiguracoes);
//atualiza configurações
router.patch('/update-configuracoes/:id', configuracoes.updateConfiguracoes);
//deleta as configurações
router.delete('/delete-configuracoes/:id', configuracoes.deleteConfiguracoes);

module.exports = router;