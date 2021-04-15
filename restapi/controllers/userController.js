const mysql = require("mysql");
const db = require('../db');
const {checkLoginToken} = require("../utils/authManager");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authManager = require('../utils/authManager');


const TABLE = 'user';

async function hashPassword(password) {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 7, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
}


exports.createUser = async (req, res) => {

    const {email, firstname, lastname, password} = req.body;
    const user_group = "customer";

    if (typeof email === 'undefined' || typeof firstname === 'undefined' || typeof lastname === 'undefined' || typeof password === 'undefined' || typeof user_group === 'undefined') {
        return res.status(400).json({error: true});
    }

    if (email === '' || firstname === '' || lastname === '' || password === '' || user_group === '') {
        return res.status(400).json({error: true});
    }

    const password_hash = await hashPassword(password);
    console.log(password_hash);

    db.query(`INSERT INTO ${TABLE} (email, firstname, lastname, password_hash, user_group) VALUES (${mysql.escape(email)}, ${mysql.escape(firstname)}, ${mysql.escape(lastname)}, ${mysql.escape(password_hash)}, ${mysql.escape(user_group)});`, function (err, result) {
        if (err) return res.status(400).json({error: true});
        res.status(200).json({
            result: result.affectedRows === 1
        });
    });
};

exports.checkUserCredentials = (req, res) => {
    const {email, password} = req.body;

    if (typeof email === 'undefined' || typeof password === 'undefined') {
        return res.status(400).json({login: 'failed', error: true});
    }

    db.query(`SELECT * FROM ${TABLE} WHERE email=${mysql.escape(email)};`, function (err, result) {
        if (err || result.length === 0) return res.status(200).json({login: 'failed', error: true});
        result = result[0];

        bcrypt.compare(password, result.password_hash, function (err, login_result) {
            if (login_result) {
                delete result.password_hash;
                const token = jwt.sign({...result}, authManager.secret, {expiresIn: '7d'});

                res.status(200).json({
                    login: login_result ? 'success' : 'failed',
                    token: token,
                    result: result
                });
            } else {
                return res.status(200).json({login: 'failed', error: true});
            }
        });
    });
};

exports.updateUser = async (req, res) => {
    if (!await checkLoginToken(req, res)) return;

    const {id, email, firstname, lastname, password} = req.body;
    let updateStatements = [];

    if (typeof id === 'undefined' || id === '') {
        return res.status(200).json({error: true});
    }
    if (typeof firstname !== 'undefined' && firstname !== '') {
        updateStatements.push(`firstname = ${mysql.escape(firstname)}`);
    }
    if (typeof lastname !== 'undefined' && lastname !== '') {
        updateStatements.push(`lastname = ${mysql.escape(lastname)}`);
    }
    if (typeof password !== 'undefined' && password !== '') {
        const password_hash = await hashPassword(password);
        updateStatements.push(`password_hash = ${mysql.escape(password_hash)}`);
    }

    db.query(`UPDATE ${TABLE} SET ${updateStatements.join(',')} WHERE id = ${mysql.escape(id)} AND email = ${mysql.escape(email)};`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.affectedRows >= 1
        });
    });
};