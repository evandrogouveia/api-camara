
const multer = require('multer');
const headerController = require('../controllers/header/headerController');
const homeController = require('../controllers/home/homeController');
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
const router = require('express').Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

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
router.post('/new-news', multer({
    storage: newsController,
    limits: {
        fieldNameSize: 300,
        fileSize: 1048576, // 10 Mb
    }
}).single('file'), newsController.newNews);
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
router.post('/new-matter', matterController.newMatter);
//obtem todos as matérias
router.get('/all-matter', matterController.getAllMatter);
//atualiza a matéria
router.patch('/update-matter/:id', matterController.updateMatter);
//deleta a matéria
router.delete('/delete-matter/:id', matterController.deleteMatter);

/*--------------------------- ROTAS SESSÃO---------------------------*/
//adiciona uma nova sessão
router.post('/new-session', sessionController.newSession);
//obtem todos as sessãos
router.get('/all-session', sessionController.getAllSessions);
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
    { name: 'logo' },
    { name: 'background' },
]), headerController.registerHeader);
//obtem dados do header
router.get('/header', headerController.geHeader);
//atualiza o header
router.patch('/update-header/:id', multer(headerController).fields([
    { name: 'logo' },
    { name: 'background' },
]), headerController.updateHeader);

/*--------------------------- ROTAS DA HOME ---------------------------*/
//cadastra a home
router.post('/register-home', multer(homeController).fields([
    { name: 'banner1' },
    { name: 'banner2' },
    { name: 'banner3' }
]), homeController.registerHome);
//obtem dados da home
router.get('/home', homeController.getHome);
//atualiza a home
router.patch('/update-home/:id', multer(homeController).fields([
    { name: 'banner1' },
    { name: 'banner2' },
    { name: 'banner3' }
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
router.post('/new-lrf', multer(lrfController).array('file'), lrfController.newLrf);
//obtem todas as LRF
router.get('/all-lrf', lrfController.getAllLrf);
//atualiza a LRF
router.patch('/update-lrf/:id', multer(lrfController).array('file'), lrfController.updateLrf);
//deleta a LRF
router.delete('/delete-lrf/:id', lrfController.deleteLrf);

/*--------------------------- ROTAS DE LEIS ---------------------------*/
//adiciona uma nova LEI
router.post('/new-lei', multer(leisController).array('file'), leisController.newLei);
//obtem todas as LEI
router.get('/all-leis', leisController.getAllLeis);
//atualiza a LEI
router.patch('/update-lei/:id', multer(leisController).array('file'), leisController.updateLei);
//deleta a LEI
router.delete('/delete-lei/:id', leisController.deleteLei);

module.exports = router;