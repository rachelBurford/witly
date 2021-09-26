import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import bcrypt from 'bcrypt';
import connectPgSimple from 'connect-pg-simple';
import dotenv from 'dotenv';
import { pool } from './db.js';
import peopleRouter from './routes/people.js';
import userRouter from './routes/users.js';
import { imageData } from './fixtures/images.js';

dotenv.config();


const app = express();

app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.json());

app.use(
    session({
        store: new (connectPgSimple(session))({
            createTableIfMissing: true,
            pool: pool,
        }),
        secret: process.env.COOKIE_SECRET,
        resave: false,
        cookie: { masAge: 30 * 24 * 60 * 60 * 1000},
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(async function (username, password, done) {
        let result;
        try {
            const sql = 'SELECT * FROM users WHERE username = $1';
            const values = [username];
            result = await pool.query(sql, values);
        } catch (error){
            return done(error);
        }
        if (!result) {
            return done(null, false, { messgae: 'Incorrect username.' });
        }
        const match = await bcrypt.compare(password, result.rows[0].password);
        if (match) {
            return done(null, result);
        }
            return done(null, false, {message: 'Incorrect password.' });
        })
);

passport.serializeUser(function (user, done) {
    let userObject = {
        id: user.rows[0].id,
        username: user.rows[0].username,
    };
    done(null, userObject);
});

passport.deserializeUser(async function (user, done) {
    const sql = 'SELECT * FROM users WHERE username = $1';
    const values = [user.username];
    let result;
    try {
        result = await pool.query(sql, values);
        done(null, result);
    } catch (error) {
        done(err, result);
    }
});

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', './views/pages/');
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started!')
});

app.use('/', peopleRouter)
app.use('/', userRouter)

app.get('/images/:id',(req,res) => {
    let imageId = req.params.id;
    let data;
    imageData.every((dataData) => {
        if (dataData.id == imageId) {
            data = dataData;
            return false;
        }
    });
    res.render('images', { data: data});

});

// app.get('/login/:id', (req, res) => {
//     let userId = req.params.id;
//     let credentials;
//     userData.every((credentialsData) => {
//         if (credentialsData.id == userId) {
//             credentials = credentialsData;
//             return false;
//         }
//     });

//     res.render('user', { credentials: credentials });
// });

// app.get('/login', (req, res) => {
//     res.render('login');
// });

