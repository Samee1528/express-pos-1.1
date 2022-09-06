const express = require('express')
const app = express()
const port = 4001

app.use(express.json ())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    res.send('Request send in post')
})

app.get('/customer', (req, res) => {
    res.send('Get Request')
})

app.post('/customer', (req, res)=> {
    console.log(req.body.id);
    res.send('<h2>Post Request  Customer</h2>')
})
  
  

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})