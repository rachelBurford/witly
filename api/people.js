// import { peopleData } from '../fixtures/people.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config()

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;


export const fetchPeople = async function (name) {
    const query = `?name=${name}`;
    const url = `${API_URL}people${name ? query : ''}`;
    console.log(url);
    const response = await fetch(url, {
        headers: {
            Authorization: `Token ${API_KEY}`
        },
    });
    if (response.status == 401) {
        return;
    }
    return response.json();
}

export const fetchPerson = function (personId) { 
    // const query = `?id=${personId}`;
    const url = `${API_URL}people/${personId}`;
    console.log(url);
    return fetch(url, {
        headers: {
            Authorization: `Token ${API_KEY}`
        },
    }).then(function(res) { 
        if (res.status == 401) {
            return;
        }
        return res.json();
    }).then(function(res){
        console.log(res);
        return res; 
    }).catch();
}

export const createPerson = async function(formData) {
    const response = await fetch(`${API_URL}people`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Token ${API_KEY}`, 
        }
    });
    return response.json();
}

export const updatePerson = async function(formData) {
    const response = await fetch(`${API_URL}people/${personId}`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Token ${API_KEY}`, 
        }
    });
    return response.json();
}