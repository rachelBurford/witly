import bcrypt, { hash } from 'bcrypt';

import { pool } from '../db.js';

export const createUser = async function (user) {
    console.log(user) 
    try {
        let sql = `INSERT INTO users (username, password) VALUES ($1,$2)`;
        let password = user.password;

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        let values = [user.username, hash];
        let result = await pool.query(sql, values);
    } catch (error) {
        console.log(error.stack);
    }
};