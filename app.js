// const ds = require(`${__dirname}/dev-data/data/tours-simple.json`)
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json()); // middleware to grab data from req body otherwise it will be undefined
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
app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign(
        {
            id: newId,
        },
        req.body
    );
    tours.push(newTour);

    fs.writeFile(
        `./dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
});
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params)
    const id = req.params.id * 1

    const tour = tours.find(el => el.id === id)
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: "Invalid Id"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });

});
app.listen(port, () => {
    console.log(`App is listening of port: ${port}`);
});
