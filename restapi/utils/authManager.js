const mysql = require("mysql");
const db = require('../db');
const jwt = require('jsonwebtoken');

exports.secret = 'wr%go9P^iQgvZ*apbwLA52M5Z';

exports.checkLoginToken = async (req, res, minimumPermissionGroup = '') => {
    return new Promise((resolve, reject) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) reject();
                const permissionGroup = decoded.user_group;

                if (minimumPermissionGroup === 'admin' && permissionGroup !== 'admin') {
                    reject();
                }
                db.query(`SELECT * FROM user WHERE id=${mysql.escape(decoded.id)} AND user_group=${mysql.escape(permissionGroup)};`, function (err, result) {
                    if (err || result.length === 0) reject();

                    resolve(true);
                });
            });
        } else {
            reject();
        }
    }).catch(() => {
        res.status(401).json({unauthorized: true, error: true})
    });
}
