const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = process.env.PORT || 8000 ;

const expressLayouts = require('express-ejs-layouts');

const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: false }));
app.use(express.static('./assets'));
app.use(cookieParser());
app.use(expressLayouts);

// EXTRACT STYLE AND SCRIPT FROM SUBPAGES INTO THE LAYOUT
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//USE EXPRESS ROUTER
app.use('/', require('./routes')); //automatically fetches index.js

//SET UP THE VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if(err) {
        console.log(`Error : ${err}`);
        return;
    }

    console.log(`Server is running on port ${port}`);
});