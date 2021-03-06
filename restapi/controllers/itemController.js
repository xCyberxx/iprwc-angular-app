const mysql = require("mysql");
const db = require('../db');
const {checkLoginToken} = require("../utils/authManager");

const TABLE = 'item';

exports.getAllItems = (req, res) => {
    db.query(`SELECT * FROM ${TABLE} WHERE isActive = 1;`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.length !== 0 ? result : false
        });
    });
};

exports.getItem = (req, res) => {
    const {id} = req.params;

    if (typeof id === 'undefined') {
        return res.status(200).json({error: true});
    }

    db.query(`SELECT * FROM ${TABLE} WHERE id = ${mysql.escape(id)} AND isActive = 1;`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.length !== 0 ? result[0] : false
        });
    });
};

exports.updateItem = async (req, res) => {
    if (!await checkLoginToken(req, res, "admin")) return;

    const {id, name, description, image, price} = req.body;
    let updateStatements = [];

    if (typeof id === 'undefined') {
        return res.status(200).json({error: true});
    }

    if (typeof name !== 'undefined' && name !== '') {
        updateStatements.push(`name = ${mysql.escape(name)}`);
    }
    if (typeof description !== 'undefined' && description !== '') {
        updateStatements.push(`description = ${mysql.escape(description)}`);
    }
    if (typeof image !== 'undefined' && image !== '') {
        updateStatements.push(`image = ${mysql.escape(image)}`);
    }
    if (typeof price !== 'undefined' && price !== '') {
        updateStatements.push(`price = ${mysql.escape(price)}`);
    }

    db.query(`UPDATE ${TABLE} SET ${updateStatements.join(',')} WHERE id = ${mysql.escape(id)};`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.affectedRows >= 1
        });
    });
};

exports.createItem = async (req, res) => {
    if (!await checkLoginToken(req, res, "admin")) return;

    let {name, description, image, price} = req.body;

    if (typeof name === 'undefined' || name === '') {
        return res.status(200).json({error: true});
    }
    if (typeof description === 'undefined' || description === '') {
        return res.status(200).json({error: true});
    }
    if (typeof image === 'undefined' || image === '') {
         image = "defaultimg.png";
     }
    if (typeof price === 'undefined' || price === '') {
        return res.status(200).json({error: true});
    }

    db.query(`INSERT INTO ${TABLE} (name, description, image, price) VALUES (${mysql.escape(name)}, ${mysql.escape(description)}, ${mysql.escape(image)}, ${mysql.escape(price)});`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.affectedRows === 1,
        });
    });
};

exports.deleteItem = async (req, res) => {
    if (!await checkLoginToken(req, res, 'admin')) return;

    const {id} = req.body;

    if (typeof id === 'undefined') {
        return res.status(200).json({error: true});
    }

    // db.query(`DELETE FROM ${TABLE} WHERE id = ${mysql.escape(id)};`, function (err, result) {
    //     if (err) return res.status(200).json({error: true});
    //     res.status(200).json({
    //         result: result.affectedRows >= 1
    //     });
    // });

    db.query(`CALL deleteItem(${mysql.escape(id)})`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.affectedRows >= 1
        });
    });

};
