const mysql = require("mysql");
const db = require('../db');
const uid = require('../utils/uid');
const {checkLoginToken} = require("../utils/authManager");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const mailSender = require('../controllers/mailController')
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
    // if (!await checkLoginToken(req, res)) return;

    const {email, firstname, lastname, password} = req.body;
    const user_group = "customer";
    // const id = uid.createID();

    // console.log(email, firstname, lastname, password, user_group);

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