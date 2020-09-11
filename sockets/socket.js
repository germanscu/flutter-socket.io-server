
const { io } = require('../index');




// sockets mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.on('disconnect', () => { 
        console.log('cliente desconectado')
        });

    client.on('mensaje', ( payload) => {
        console.log('mensaje!!', payload);

        io.emit( 'mensaje ', { admin: 'nuevo mensaje'});

    });


  });
