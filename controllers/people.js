import fs from 'fs';
import { imageData } from '../fixtures/images.js'
import FormData from 'form-data';
import { fetchPerson , fetchPeople, createPerson } from "../api/people.js";


export const fetchPeopleController = async function (req, res) {
    const name = req.query.name;
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }
    const peopleData = await fetchPeople(name);
    if (peopleData) {
        res.render('index', {
            people: peopleData,
            user: user,
            imageData: imageData,
        });
    } else {
        res.send('Not authorized.');
    }
};


export const fetchPersonController = async function (req, res) {
    const personId = req.params.id;
    let user = null;
    const personData = await fetchPerson(personId);
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }
    res.render('profile', { person: personData, user: user, imageData: imageData, })
}

export const createPersonFormController = function (req, res) {
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }    
    res.render('newProfile', { user: user, imageData: imageData, })
}

export const createPersonController = async function (req, res) {
    let personData = req.body;
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }
    const form = new FormData();
    form.append('name', personData.name);
    form.append('tagline', personData.tagline);
    form.append('bio', personData.bio);
    const fileStream = fs.createReadStream(req.file.path);
    form.append('photo', fileStream, req.file.originalname);

    let newPerson;
    try {
            newPerson = await createPerson(form);
    } catch (err) {
            console.log(err)
    }
    if (newPerson) {
        console.log(newPerson)
            res.render('profile', { person: newPerson, user: user, imageData: imageData });
    } else {
            res.send('Error.');
    }
};

export const updatePersonController = async function (req, res) {
    let personData = req.body;
    console.log("hi" + personData)
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }
    const form = new FormData();
    form.append('name', personData.name);
    form.append('tagline', personData.tagline);
    form.append('bio', personData.bio);
    const fileStream = fs.createReadStream(req.file.path);
    form.append('photo', fileStream, req.file.originalname);

    let newPerson;
    try {
            newPerson = await updatePerson(form);
    } catch (err) {
            console.log(err)
    }
    if (newPerson) {
        console.log(newPerson)
            res.render('profile', { person: newPerson, user: user, imageData: imageData });
    } else {
            res.send('Error.');
    }
};
