const production = {
    name: "production",
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env. CODIEAL_SESSION_COOKIE,
    db_url: process.env.CODEIAL_MONGO_URL,
    smtp: {
        service: 'google',
        host: 'smtp.gmail.com',
        secure: false,
        auth:{
            user: process.env.CODIEAL_SMTP_USER,
            pass: process.env.CODIEAL_SMTP_USESR_PASS,
        }
    },
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    google_call_backURL: process.env.CODIEAL_GOOGLE_CALLBACKURL,
    clientID: process.env.CODEIAL_GOOGLE_CLIENTID,
    clientSecret: process.env.CODEIAL_GOOGLE_SECRET,
}

const development = {
    name: "development",
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db_url: 'mongodb://127.0.0.1:27017/codeial_developement',
    smtp: {
        service: 'google',
        host: 'smtp.gmail.com',
        secure: false,
        auth:{
            user: 'hellotd12@gmail.com',
            pass: 'cxuf fwbx akpp tjvf',
        }
    },
    jwt_secret: 'codeial',
    google_call_backURL: 'http://localhost:8000/users/auth/google/callback',
    clientID: '10421589225-9l16nnok8bkj0p90t8b8jcpfod5h41pg.apps.googleusercontent.com',
    clientSecret: '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',
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);
// module.exports = development;