import express from 'express';
import peopleRouter from './routes/people.js'

// import { peopleData } from './fixtures/people.js';
import { imageData } from './fixtures/images.js';
import { userData } from './fixtures/users.js';

const app = express();
app.use(express.static('static'))
app.set('view engine', 'ejs');
app.set('views', './views/pages/');

app.listen(3000, () => {
    console.log('Server started!')
});

app.use('/', peopleRouter)

// app.get('/', (req, res) => {
//     // res.send('Hello, world!')
//     console.log(peopleData);
//     res.render('index', { people: peopleData });
// });

// app.get('/profile/:id', (req,res) => {
//     let personId = req.params.id;
//     let person;
//     peopleData.forEach((personData) => {
//         if (personData.id == personId) {
//             person = personData;
//         }
//     })
//     console.log(person);
//     res.render('profile', { person: person});

// });


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

app.get('/login/:id', (req, res) => {
    let userId = req.params.id;
    let credentials;
    userData.every((credentialsData) => {
        if (credentialsData.id == userId) {
            credentials = credentialsData;
            return false;
        }
    });

    res.render('user', { credentials: credentials });
});

app.get('/login', (req, res) => {
    res.render('login');
});

