const express = require('express')

const app = express()

app.use(express.json())

const mongoose = require('mongoose') // 使用Mongoose连接MongoDB
mongoose.connect('mongodb://localhost:27017/learnexpress', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const Product = mongoose.model('Product',new mongoose.Schema({
    title: String,
}))
// Product.insertMany([
//     {title: '产品1'},
//     {title: '产品2'},
//     {title: '产品3'}

// ])
app.use(require('cors')()) // 插件cors解决跨域问题

// app.use('/static', express.static('public'))
app.use('/', express.static('public'))

app.get('/', function(req,res) {
    res.send([
        {
            page: 'home'
        }
    ])
})
app.get('/about', function (req, res) {
    res.send([
        {
            page: 'about us'
        }
    ])
})
app.get('/products', async function (req, res) {
    res.send(
        await Product.find()
    )
})

app.get('/products/:id', async function (req,res) {
    const data = await Product.findById(req.params.id)
    res.send(data)
})

app.post('/products', async function (req,res){
    const data = req.body
    const product = await Product.create(data)
    res.send(product)
})

app.put('/products/:id', async function (req,res){
    const product = await Product.findById(req.params.id)
    product.title = req.body.title
    await product.save()
    res.send(product)
})

app.delete('/products/:id', async function (req,res){
    const product = await Product.findById(req.params.id)
    await product.remove()
    res.send({
        success: true
    })
})

app.listen(3000, () => {
    console.log('app listening on port 3000!');
    
})
