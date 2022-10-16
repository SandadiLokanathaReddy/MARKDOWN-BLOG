const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const Article = require('./models/article')
const article = require("./models/article")
const articleRouter = require("./routes/articles")
const app = express()


mongoose.connect("mongodb+srv://lokanath:markdownblog@markdown-blog-cluster.fhazg2g.mongodb.net/test",  {useNewUrlParser : true, useUnifiedTopology : true})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt : 'desc'})
    res.render('articles/index', {articles : articles})
})


const port = 5000
app.listen(port, function(){
    console.log("Server is running at port:",port)
})


app.use('/articles', articleRouter)