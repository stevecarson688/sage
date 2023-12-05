const mongoose = require('mongoose');

var mongoURL = `mongodb+srv://tchao:2002@cluster1.nul0kct.mongodb.net/mern-rooms`

mongoose.connect(mongoURL , {useUnifiedTopology: true , useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('Mongo DB Connection failed')
})


connection.on('connection', ()=>{
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose

 





