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
        console.log('Connected to the MySQL server(Item)');
        var query = "CREATE TABLE IF NOT EXISTS item (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), qty DOUBLE , unitprice DOUBLE)"
        connection.query(query, function (err, result) {
            if (result.warningCount === 0) {
                console.log("Item table created!");
            }
        })
    }
})

// Get All
router.get('/', (req, res) => {
    var query = "SELECT * FROM item";
    connection.query(query, (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
})

// Add
router.post('/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const qty = req.body.qty
    const unitprice= req.body.unitprice

    var query = "INSERT INTO item (id, name, qty, unitprice) VALUES (?, ?, ?, ?)";

    connection.query(query, [id, name, qty, unitprice], (err) => {
        if (err) {
            res.send({ 'message': 'duplicate entry' })
        } else {
            res.send({ 'message': 'Item Saved Successfully!' })
        }
    })

})

// Update
router.put('/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const qty = req.body.qty
    const unitprice= req.body.unitprice


    var query = "UPDATE item SET name=?, qty=?, unitprice=? WHERE id=?";

    connection.query(query, [name, qty, unitprice, id], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'Item updated' })
        } else {
            res.send({ 'message': 'Item not found' })
        }
    })
})

// Delete Using ID
router.delete('/:id', (req, res) => {
    const id = req.params.id

    var query = "DELETE FROM item WHERE id=?";

    connection.query(query, [id], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'Item deleted' })
        } else {
            res.send({ 'message': 'Item not found' })
        }
    })
})

// Get Using ID
router.get('/:id', (req, res) => {
    const id = req.params.id

    var query = "SELECT * from item WHERE id=?";

    connection.query(query, [id], (err, result) => {
        if(err) console.log(err);

        res.send(result)
    })
})


module.exports = routerconst express = require('express')
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
        console.log('Connected to the MySQL server(Item)');
        var query = "CREATE TABLE IF NOT EXISTS item (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), qty DOUBLE , unitprice DOUBLE)"
        connection.query(query, function (err, result) {
            if (result.warningCount === 0) {
                console.log("Item table created!");
            }
        })
    }
})

// Get All
router.get('/', (req, res) => {
    var query = "SELECT * FROM item";
    connection.query(query, (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
})

// Add
router.post('/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const qty = req.body.qty
    const unitprice= req.body.unitprice

    var query = "INSERT INTO item (id, name, qty, unitprice) VALUES (?, ?, ?, ?)";

    connection.query(query, [id, name, qty, unitprice], (err) => {
        if (err) {
            res.send({ 'message': 'duplicate entry' })
        } else {
            res.send({ 'message': 'Item Saved Successfully!' })
        }
    })

})

// Update
router.put('/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const qty = req.body.qty
    const unitprice= req.body.unitprice


    var query = "UPDATE item SET name=?, qty=?, unitprice=? WHERE id=?";

    connection.query(query, [name, qty, unitprice, id], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'Item updated' })
        } else {
            res.send({ 'message': 'Item not found' })
        }
    })
})

// Delete Using ID
router.delete('/:id', (req, res) => {
    const id = req.params.id

    var query = "DELETE FROM item WHERE id=?";

    connection.query(query, [id], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'Item deleted' })
        } else {
            res.send({ 'message': 'Item not found' })
        }
    })
})

// Get Using ID
router.get('/:id', (req, res) => {
    const id = req.params.id

    var query = "SELECT * from item WHERE id=?";

    connection.query(query, [id], (err, result) => {
        if(err) console.log(err);

        res.send(result)
    })
})


module.exports = router