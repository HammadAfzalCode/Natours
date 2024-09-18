const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// const {} = require('./public')

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('./public')) // middleware to grab data from req body otherwise it will be undefined
app.use((req, res, next) => {
    console.log('hello from middleware');
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


// Mounting the router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app