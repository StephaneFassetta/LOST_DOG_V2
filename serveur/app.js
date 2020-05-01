const babel = require("@babel/register")({presets: ["@babel/preset-env"]});
const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//__ Library
const app = require('./bin/www').app;
const io = require('./bin/www').io;
const tools = require('./classes/Tools');
const GameRoom = require('./classes/GameRoom');
const Admin = require('./classes/Admin');
const Card = require('./classes/Card');

//__ Routing
const indexRouter = require('./routes/index');
const roomRouter = require('./routes/room/room.index');
const settingsRouter = require('./routes/settings/settings.index');
const ajaxRouter = require('./routes/ajax');

const roomsActive = {};

//__ Views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

//__ Use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

app.use('/classes', express.static(path.join(__dirname, 'classes')));


io.on('connection', function(socket) {
    console.log('Connexion au socket');



    socket.on('createGameRoom', function(params)
    {
        const admin = new Admin(params.admin.pseudo, params.admin.socketId);
        const gameRoom = new GameRoom(params.gameRoom.roomName, params.gameRoom.playerLimit, admin);
        const chooseCard = params.gameRoom.chooseCard;
        const cards = params.cards;

        for (let role in chooseCard) {
            for (let x = 0; x < chooseCard[role]; x++) {
                const card = cards.find(card => card.id == role);
                gameRoom.cards.push(new Card(role, card.name, card.description));
            }
        }

        socket.join(gameRoom.name);
        roomsActive[gameRoom.name] = gameRoom;
        socket.gameRoom = gameRoom;
        console.log('Une room vient d\'être créé. Nom de la room : ' + gameRoom.name);

        io.sockets.to(gameRoom.name).emit('refreshInfosUsersAndGame', { 'game' : gameRoom, 'user' : admin, 'event' : 'createGameRoom'});
    });

    socket.on('joinGameRoom', function(params) {
        const player = params.player;
        const roomName = params.nameRoom;
        const gameExist = roomsActive[roomName];

        if (gameExist && gameExist.players.length < gameExist.size) {
            socket.join(roomName);
            socket.game = gameExist;
            gameExist.players.push(player);
            console.log('Vous avez rejoins une room. Nom de la room : ' + roomName);
            io.sockets.to(roomName).emit('refreshInfosUsersAndGame', { 'game' : gameExist, 'user' : player, 'event' : 'joinGameRoom'});
        }
    });





    socket.on('disconnect', function () {
        if (socket.game) {
            const gameExist = socket.game;
            const playerLeave = gameExist.players.find((player) => player.socketId === socket.id);

            Object.keys(gameExist.players).forEach(function(key) {
                if (gameExist.players[key].socketId == socket.id) {
                    console.log('Le joueur ' + gameExist.players[key].name + ' a quitté la partie !');
                    gameExist.players.splice(gameExist.players.indexOf(gameExist.players[key]));
                    socket.leave(gameExist.name);
                }
            });

            if (gameExist.players.length < 1) {
                console.log(gameExist.name);
                delete roomsActive[gameExist.name];
            } else {
                io.sockets.to(gameExist.name).emit('refreshInfosUsersAndGame', {'game' : gameExist, 'user' : playerLeave, 'event' : 'disconnectToGame'});
            }
        }
    });

    socket.on('startGame', function(nameRoom) {
        let gameToStart = roomsActive[nameRoom.name];

        if (gameToStart && gameToStart.status == 'lobby' && gameToStart.size == gameToStart.cards.length && gameToStart.size == gameToStart.players.length) {
            console.log('La partie ' + gameToStart.name + ' a été lancé ! C\'est parti !');
            gameToStart.status = 'started';
            tools.shuffleArray(gameToStart.cards);

            gameToStart.players.forEach(function (element, index) {
                element.role = gameToStart.cards[index];
            });

            io.sockets.to(gameToStart.name).emit('launchGame', gameToStart);
        }
    });
    socket.on('updateActualGame', function(nameRoom) {
        const game = roomsActive[nameRoom.name];

        if (!game) {
            return false;
        }

        io.sockets.to(game.name).emit('retrieveActualGame', game);
    });
    socket.on('vibratePlayer', function(informations) {
        const game = roomsActive[informations.nameRoom];
        let player = game.players.find((player) => player.socketId === informations.socketId);
        io.sockets.to(informations.socketId).emit('vibratePlayer', player);
    });
    socket.on('killPlayer', function(informations) {
        let game = roomsActive[Object.keys(roomsActive).find((key) => key === informations.nameRoom)];
        let socketId = informations.socketId;
        let player = game.players.find((player) => player.socketId === socketId);
        player.alive = false;
        game.lastPlayerKilled = player;
        io.sockets.to(game.name).emit('killPlayer', game);
    });
});

app.use(function(req, res, next) {
    req.io = io;
    req.roomsActive = roomsActive;
    next();
});

app.use('/', indexRouter);
app.use('/room', roomRouter);
app.use('/settings', settingsRouter);
app.use('/ajax', ajaxRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});