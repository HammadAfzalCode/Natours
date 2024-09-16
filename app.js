// const ds = require(`${__dirname}/dev-data/data/tours-simple.json`)
const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    // here the cb is route Hanlder
    res.status(200).json({
        status: 'success',
        data: {
            results: tours.length,
            tours,
        },
    });
});
app.listen(port, () => {
    console.log(`App is listening of port: ${port}`);
});
