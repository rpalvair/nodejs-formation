require('babel-register')

const express = require('express')
const app = express()

app.get('/api',(req, res) => {
    res.send('Root API')
})


app.listen(8080, () => console.log("Started on port 8080"))