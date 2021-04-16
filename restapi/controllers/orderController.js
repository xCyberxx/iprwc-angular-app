const mysql = require("mysql");
const db = require('../db');
const {checkLoginToken} = require("../utils/authManager");

const TABLE = 'bestelling';


exports.getAllOrders = async (req, res) => {
    if (!await checkLoginToken(req, res, "admin")) return;

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

    db.query(`SELECT bestelling.id, bestelling.user_id, bestelling.date, cart.product_id, item.name, item.description, item.image, item.price, user.firstname, user.lastname FROM bestelling RIGHT JOIN (koppel_item_bestelling, cart, item, user) ON (bestelling.id = koppel_item_bestelling.bestelling_id AND cart.id = koppel_item_bestelling.cart_id AND item.id = cart.product_id AND user.id = bestelling.user_id) WHERE bestelling.id IS NOT NULL AND bestelling.user_id = ${mysql.escape(id)} ORDER BY bestelling.id`, function (err, result) {
        if (err) return res.status(200).json({error: true});
        res.status(200).json({
            result: result.length !== 0 ? result : false
        });
    });

}
