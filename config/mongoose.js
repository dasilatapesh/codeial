const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/codeial_developement");

const db = mongoose.connection;

db.on('error', console.log.bind(console, "Error connnecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to DataBse :: MongoDB ');
});

module.exports= db;