const express = require("express")
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`App is listening of port: ${port}`)
})

app.get('/api/v1/tours', (req, res) => { // here the cb is route Hanlder 
    res.status(200).json({
        message: "hello"
    })
})