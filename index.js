const express = require('express');

const app = express();

const port = process.env.PORT || 8000 ;
//USE EXPRESS ROUTER
app.use('/', require('./routes')); //automatically fetches index.js

//SET UP THE VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if(err) {
        console.log(`Error : ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});