const mongoose = require('mongoose');
const env = require("./environment");

mongoose.connect(env.db_url);

const db = mongoose.connection;

db.on('error', console.log.bind(console, "Error connnecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to DataBse :: MongoDB ');
});

module.exports= db;