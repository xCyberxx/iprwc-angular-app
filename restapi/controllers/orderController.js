const mysql = require("mysql");
const db = require('../db');
const {checkLoginToken} = require("../utils/authManager");

const TABLE = 'bestelling';


exports.getAllOrders = async (req, res) => {
    if (!await checkLoginToken(req, res, "admin")) return;
    
    // db.query(`SELECT * FROM ${TABLE};`, function (err, result) {
    //     if (err) return res.status(200).json({error: true});
    //     res.status(200).json({
    //         result: result.length !== 0 ? result : false
    //     });
    // });


    db.query(`SELECT bestelling.id, bestelling.user_id, bestelling.date, cart.product_id, item.name, item.description, item.image, item.price, user.firstname, user.lastname FROM bestelling RIGHT JOIN (koppel_item_bestelling, cart, item, user) ON (bestelling.id = koppel_item_bestelling.bestelling_id AND cart.id = koppel_item_bestelling.cart_id AND item.id = cart.product_id AND user.id = bestelling.user_id) WHERE bestelling.id IS NOT NULL ORDER BY bestelling.id`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.length !== 0 ? result : false
        });
    });

}

exports.getOrderByUser = async (req, res) => {
    if (!await checkLoginToken(req, res)) return;
    
    const {id} = req.params;
    console.log("user_id: " + id)
    // db.query(`SELECT * FROM ${TABLE};`, function (err, result) {
    //     if (err) return res.status(200).json({error: true});
    //     res.status(200).json({
    //         result: result.length !== 0 ? result : false
    //     });
    // });


    db.query(`SELECT bestelling.id, bestelling.user_id, bestelling.date, cart.product_id, item.name, item.description, item.image, item.price, user.firstname, user.lastname FROM bestelling RIGHT JOIN (koppel_item_bestelling, cart, item, user) ON (bestelling.id = koppel_item_bestelling.bestelling_id AND cart.id = koppel_item_bestelling.cart_id AND item.id = cart.product_id AND user.id = bestelling.user_id) WHERE bestelling.id IS NOT NULL AND bestelling.user_id = ${mysql.escape(id)} ORDER BY bestelling.id`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.length !== 0 ? result : false
        });
    });

}



exports.createCartItem = async (req, res) => {
    if (!await checkLoginToken(req, res)) return;

    var {user_id, product_id} = req.body;

    if (typeof user_id === 'undefined' || user_id === '') {
        return res.status(200).json({error: true});
    }
    if (typeof product_id === 'undefined' || product_id === '') {
        return res.status(200).json({error: true});
    }

    db.query(`INSERT INTO ${TABLE} (user_id, product_id) VALUES (${mysql.escape(user_id)}, ${mysql.escape(product_id)});`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.affectedRows === 1,
        });
    });
};

exports.getItemsFromId = (req, res) => {
    const {id} = req.params;

    if (typeof id === 'undefined') {
        return res.status(200).json({error: true});
    }

    db.query(`SELECT * FROM ${TABLE} WHERE user_id = ${mysql.escape(id)} AND isActive=1;`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.length !== 0 ? result : false
        });
    });
};

exports.deleteCartItem = async (req, res) => {
    if (!await checkLoginToken(req, res, '')) return;

    const {id} = req.body;
    console.log(id);
    if (typeof id === 'undefined') {
        return res.status(200).json({error: true});
    }

    db.query(`DELETE FROM ${TABLE} WHERE id = ${mysql.escape(id)};`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.affectedRows >= 1
        });
    });
};

exports.payCartItems = async (req, res) => {
    if (!await checkLoginToken(req, res)) return;

    const {user_id} = req.body;
    let updateStatements = [];

    if (typeof user_id === 'undefined') {
        return res.status(200).json({error: true});
    }

    // db.query(`UPDATE ${TABLE} SET isActive=0 WHERE user_id = ${mysql.escape(user_id)} AND isActive = 1`, function (err, result) {
    //     if (err) return res.status(200).json({error: true});
    //     res.status(200).json({
    //         result: result.affectedRows >= 1
    //     });
    // });

    db.query(`CALL payCart(${mysql.escape(user_id)})`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.affectedRows >= 1
        });
    });
    
};