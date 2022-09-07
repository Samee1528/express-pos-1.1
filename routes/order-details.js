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
        console.log('Connected to the MySQL server(Order_Detail)');
        // var query = "CREATE TABLE IF NOT EXISTS `order detail` (oid VARCHAR(255) , code VARCHAR(255) , qty DOUBLE, price DOUBLE ,PRIMARY KEY)"
        var query="CREATE TABLE IF NOT EXISTS `Order detail`( oid VARCHAR(15),code VARCHAR(15),qty DOUBLE, price DOUBLE , CONSTRAINT PRIMARY KEY (oid,code),CONSTRAINT FOREIGN KEY (code) REFERENCES item(id) ON DELETE CASCADE ON UPDATE CASCADE)"
        connection.query(query, function (err, result) {
            if (result.warningCount === 0) {
                console.log("Order_Detail table created!");
            }
        })
    }
})

// Get All
router.get('/', (req, res) => {
    var query = "SELECT * FROM `order detail`";
    connection.query(query, (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
})

// Add
router.post('/', (req, res) => {
    const oid = req.body.oid
    const code = req.body.code
    const qty = req.body.qty
    const price = req.body.price

    var query = "INSERT INTO `order detail` (oid, code, qty, price) VALUES (?, ?, ?, ?)";

    connection.query(query, [oid, code, qty, price], (err) => {
        if (err) {
            res.send({ 'message': 'duplicate entry' })
        } else {
            res.send({ 'message': 'Order_detail Saved Successfully!' })
        }
    })

})

// Update
router.put('/', (req, res) => {
    const oid = req.body.oid
    const code = req.body.code
    const qty = req.body.qty
    const price = req.body.price


    var query = "UPDATE `order detail` SET qty=?, price=? WHERE oid=? AND code=?";

    connection.query(query, [qty, price, oid, code], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'Order_detail updated' })
        } else {
            res.send({ 'message': 'Order_detail not found' })
        }
    })
})

// Delete Using ID
router.delete('/:id/:code', (req, res) => {
    const id = req.params.id
    const code=req.params.code

    var query = "DELETE FROM `order detail` WHERE oid=? AND code=?";

    connection.query(query, [id,code], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'Order_detail deleted' })
        } else {
            res.send({ 'message': 'Order_detail not found' })
        }
    })
})

// Get Using ID
router.get('/:id/:code', (req, res) => {
    const id = req.params.id
    const code=req.params.code

    var query = "SELECT * from `order detail` WHERE oid=? AND code=?";

    connection.query(query, [id,code], (err, result) => {
        if(err) console.log(err);

        res.send(result)
    })
})


module.exports = router