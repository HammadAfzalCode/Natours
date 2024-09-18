const express = require('express');
const tourController = require('../controlllers/tourController');
const router = express.Router();
const { getAllTours, createTour, getTour, updateTour, deleteTour } =
    tourController;
// in param middleware we got the fourth argument values of the param in question
router.param('id', tourController.checkID);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
