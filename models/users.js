import { pool } from '../db.js';

export const createUser = async function (user) {
    console.log(user) 
    try {
        let sql = `INSERT INTRO users (username, password) VALUES ($1,$2)`;
        let values = [user.username, user.password];
        let result = await pool.query(sql, values);
    } catch (error) {
        console.log(error.stack);
    }
};