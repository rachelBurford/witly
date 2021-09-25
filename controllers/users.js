import { request } from 'express';
import { imageData } from '../fixtures/images.js'
import { createUser } from '../models/users.js';

export const createUserFormController = function (req, res) {
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }
    return res.render('createAccount', { user: user, imageData: imageData, });
};

export const createUserController = async function (req, res) {
    let userData = req.body;
    const user = await createUser(userData);
    console.log("above")  
    console.log(userData);
    console.log("Below")
    let session;
    if (req.isAuthenticated()) {
        session = {
            id: req.session.rows[0].id,
            username: req.session.rows[0].username,
        };
        console.log("createuser-auth")
    } else {
        session = null;
        console.log("createuser-not!auth")
    }
    return res.render('login', { session: session, userData: userData, imageData: imageData, });
};

export const loginFormController = function (req, res) {
    let session;
    if (req.isAuthenticated()) {
        console.log("here");
        console.log(session);
        session = 1
        console.log("session")
    } else {
        session = null;
        console.log("session")
    }
    return res.render('login', { session: session, imageData: imageData, });
};


