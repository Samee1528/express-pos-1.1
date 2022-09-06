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
        console.log('Connected to the MySQL server(Customer)');
        var customerTableQuery = "CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), salary DOUBLE)"
        connection.query(customerTableQuery, function (err, result) {
            if (result.warningCount === 0) {
                console.log("Customer table created!");
            }
        })
    }
})

// Get All
router.get('/', (req, res) => {
    var query = "SELECT * FROM customer";
    connection.query(query, (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
})

// Add
router.post('/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const salary= req.body.salary

    var query = "INSERT INTO customer (id, name, address, salary) VALUES (?, ?, ?, ?)";

    connection.query(query, [id, name, address, salary], (err) => {
        if (err) {
            res.send({ 'message': 'duplicate entry' })
        } else {
            res.send({ 'message': 'Customer Saved Successfully!' })
        }
    })

})

// Update
router.put('/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const salary= req.body.salary


    var query = "UPDATE customer SET name=?, address=?, salary=? WHERE id=?";

    connection.query(query, [name, address, salary, id], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'customer updated' })
        } else {
            res.send({ 'message': 'customer not found' })
        }
    })
})

// Delete Using ID
router.delete('/:id', (req, res) => {
    const id = req.params.id

    var query = "DELETE FROM customer WHERE id=?";

    connection.query(query, [id], (err, result) => {
        if (err) console.log(err);

        if (result.affectedRows > 0) {
            res.send({ 'message': 'customer deleted' })
        } else {
            res.send({ 'message': 'customer not found' })
        }
    })
})

// Get Using ID
router.get('/:id', (req, res) => {
    const id = req.params.id

    var query = "SELECT * from customer WHERE id=?";

    connection.query(query, [id], (err, result) => {
        if(err) console.log(err);

        res.send(result) 
        
    })
})


module.exports = router