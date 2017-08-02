require('dotenv').config()

const express = require('express')
const app = express()
const listRoutes = require('./routes/list')

app.use(express.static('public/'))

app.get('/', (_, res) => res.sendFile('public/index.html'))

app.get('/list', listRoutes.listAllGifs(process.env))
app.get('/list/:key', listRoutes.listSingleGif(process.env))

app.listen(process.env.SERVER_PORT, () => console.log(`listening on port ${process.env.SERVER_PORT}`))
