const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT
const expressLayouts = require('express-ejs-layouts');
const db = require("./config/mongoose");
//used for sessoin cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleWare = require('./config/customMiddleWare');
//passport-jwt-strategy
const PassportJwt = require('./config/passport-jwt-strategy');
const googleAuthStrategy = require('./config/passport-google-oauth2-strategy');
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chatSocket').chatSocket(chatServer);
const env = require('./config/environment');
const path = require('path');
chatServer.listen(5000);
console.log('Chat Server running on port: 5000');
 
if(env.name=='development'){
    app.use((sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest:path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css',
    })));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./assets'));
//make upload path available to browser
app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(cookieParser());
app.use(expressLayouts);

// EXTRACT STYLE AND SCRIPT FROM SUBPAGES INTO THE LAYOUT
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//SET UP THE VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    //TODO change the secret before deployemnt in productoin mode
    secret: env.session_cookie_key,
    //if user not logged in or no identitiy established or no session initialized 
    //in that case we do not need to save extra data in session cookie
    saveUninitialized: false,
    //some data is already present in session cookie so we do not need to save again and again
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: env.db_url,
            autoRemove: "disabled"
        },
        function(err){
            console.log(err || 'connect-mongodb setup'  );
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleWare.setFlash);

//USE EXPRESS ROUTER
app.use('/', require('./routes')); //automatically fetches index.js

app.listen(port, function(err) {
    if(err) {
        console.log(`Error : ${err}`);
        return;
    }

    console.log(`Server is running on port ${port}`);
});