
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('queen' ) );
bands.addBand( new Band('soda' ) );
bands.addBand( new Band('heores' ) );
bands.addBand( new Band('caifanes' ) );

//console.log(bands);


// sockets mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => { 
        console.log('cliente desconectado')
        });

    client.on('mensaje', ( payload) => {
        console.log('mensaje!!', payload);

        io.emit( 'mensaje ', { admin: 'nuevo mensaje'});

    });

 /*    client.on('emitir-mensaje', (payload) => {        
        //console.log(payload);
        //io.emit('nuevo-mensaje', payload);  //emite a todos los clientes conectados
        client.broadcast.emit('nuevo-mensaje', payload);  //emite a todos menos al que lo manda
    })    
   */
    client.on('vote-band',(payload) => {        
        //console.log(payload);
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands());       
        //io.emit('vote-band', bands.getBands());
    });

    client.on('add-band',(payload) => {        
        const newBand = new Band(payload.name);  
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands());      
    });

    client.on('delete-band',(payload) => {                
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands());      
    });



  });

