const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origins: ['*'] } });

var cors = require('cors');
dotenv.config();

app.use(cors({origin: '*'}));

io.on('connection', (socket) => {
    socket.on('dadosPainel', (dados) => {
        console.log(dados);
        io.emit('dadosPainel', dados);
    })

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} has just disconnected. `);
    })

    console.log(`Socket ${socket.id} has connected. `)
})

app.use(bodyParser.json({ limit: '250mb' }));
app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }));
app.use(cookieParser());

const router = require('./src/routes');

app.use(router);

app.use('/api-camara/uploads', express.static('uploads'));
//app.use('/uploads', express.static('uploads'));

app.use('/api-camara/', router);
//app.use('/', cors(), router);

http.listen(port);
console.log('API funcionando!');