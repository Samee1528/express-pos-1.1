const express=require('express');
const app=express();
const port=4000;


const customer=require('./routes/customer')
const item=require('./routes/item')
const order=require('./routes/order')
const order_detail=require('./routes/order_detail')

app.use(express.json());
app.use('/customer',customer);
app.use('/item',item);
app.use('/order',order);
app.use('/order_detail',order_detail);

app.get('/',(req,res) => {
    res.send("Hello There,This is Express");
})

app.listen(port,(req,res)=>{
    console.log(`Express app listening port ${port}`);
})

