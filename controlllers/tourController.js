
const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })

    }
    next()
}
exports.checkBody = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({
            status: "fail",
            message: "Please send all required fields"
        })
    }
    next()
}
exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here ....>',
        },
    });
};
exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: 'success',
        data: null,
    });
};