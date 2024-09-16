// const ds = require(`${__dirname}/dev-data/data/tours-simple.json`)
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // middleware to grab data from req body otherwise it will be undefined
app.use((req, res, next) => {
    console.log('hello from middleware');
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
const port = 3000;

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    // here the cb is route Hanlder
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            results: tours.length,
            tours,
        },
    });
};

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    const tour = tours.find((el) => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};
const createTour = (req, res) => {
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
};
const updateTour = (req, res) => {
    const id = req.params.id * 1;

    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here ....>',
        },
    });
};
const deleteTour = (req, res) => {
    const id = req.params.id * 1;

    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};
const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};
const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};


app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);
app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);
app.listen(port, () => {
    console.log(`App is listening of port: ${port}`);
});
