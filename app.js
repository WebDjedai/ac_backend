const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./lib/routers/products_router')
const categoriesRouter = require('./lib/routers/categories_router')
const authRouter = require('./lib/routers/auth_router')
const profileRouter = require('./lib/routers/profile_router')
const favoritesRouter = require('./lib/routers/favorites_router')
const commentsRouter = require('./lib/routers/comments_router')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({
  extended: true,
}))
app.use(express.static('public'))

app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/favorites', favoritesRouter)
app.use('/comments', commentsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})