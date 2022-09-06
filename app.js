const express = require('express')
const customer = require('./routes/customer')
const app = express()
const port = 4001

app.use(express.json ())
app.use('./customer', customer)

app.get('/', (req, res) => { 
    console.log('getrequest comming');
    res.send('Hello World!')
})
  

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})