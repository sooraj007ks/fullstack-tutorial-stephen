require('./controllers/db-conn.controller'); // Init MongoDB
const path = require('path');
const express = require('express');


const PORT = process.env.PORT || 5000;
const app = express();
const keys = require('./config/keys');
const billRouter = require('./routes/bill.route.js');
const authRouter = require('./routes/auth.route.js');

app.use(express.static(path.join(__dirname, 'public')));

const passport = require('passport');
const cookieSession = require('cookie-session');

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieSecret]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/stripe', billRouter);
app.use('/', authRouter);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(
            __dirname, 'client', 'build','index.html'
        ));
    });
}

// app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));

// app.use('/', indexRouter);


app.listen(PORT, () => console.log(`Server started at port ${PORT}`));