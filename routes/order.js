const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()

// Set Mysql Connection
const connection = mysql.createConnection(db.database)

// Connect Mysql
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server(Orders)');
        var query = "CREATE TABLE IF NOT EXISTS `Orders`( oid VARCHAR(15),c_id VARCHAR(15),date DATE, CONSTRAINT PRIMARY KEY (oid),CONSTRAINT FOREIGN KEY (c_id) REFERENCES customer(id) ON DELETE CASCADE ON UPDATE CASCADE)"
        connection.query(query, function (err, result) {
            if (result.warningCount === 0) {
                console.log("order table created!");
            }
        })
    }
})

// Get All
router.get('/', (req, res) => {
    var query = "SELECT * FROM orders";
    connection.query(query, (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
})

// Add
router.post('/', (req, res) => {
    const oid = req.body.oid
    const c_id = req.body.c_id
    const date = req.body.date

    var query = "INSERT INTO orders (oid, c_id, date) VALUES (?, ?, ?)";

    connection.query(query, [oid, c_id, date], (err) => {
        if (err) {
            res.send({ 'message': 'duplicate entry' })
        } else {
            res.send({ 'message': 'Order Saved Successfully!' })
        }
    })

})

// Update
router.put('/', (req, res) => {
    const oid = req.body.oid
    const c_id = req.body.c_id
    const date = req.body.date


    var query = "UPDATE orders SET c_id=?, date=? WHERE oid=?";

    connection.query(query, [c_id, date, oid], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'Order updated' })
        } else {
            res.send({ 'message': 'Order not found' })
        }
    })
})

// Delete Using ID
router.delete('/:id', (req, res) => {
    const id = req.params.id

    var query = "DELETE FROM orders WHERE oid=?";

    connection.query(query, [id], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'Order deleted' })
        } else {
            res.send({ 'message': 'Order not found' })
        }
    })
})

// Get Using ID
router.get('/:id', (req, res) => {
    const id = req.params.id

    var query = "SELECT * from orders WHERE oid=?";

    connection.query(query, [id], (err, result) => {
        if(err) console.log(err);

        res.send(result)
    })
})


module.exports = router