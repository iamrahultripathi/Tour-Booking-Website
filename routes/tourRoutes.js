const express = require('express');

const tourController = require('./../controller/tourController')

const authController = require('./../controller/authController')
const reviewRouter = require('./../routes/reviewRoutes')

const router = express.Router();

// router.param('id', tourController.checkID)
// router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour)

router.use('/:tourId/reviews', reviewRouter)

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours)

router.route('/tour-stats').get(tourController.getTourStats)

router.route('/monthly-plan/:year').get(authController.protect, authController.restrictTo('admin', 'lead-guide', 'guide'), tourController.getMonthlyPlan)

router.route('/').get(tourController.getAllTours).post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.createTour)

router.route('/:id').get(tourController.getTour).patch(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.updateTour).delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour)
    // router.route('/:tourId/reviews').post(authController.protect, authController.restrictTo('user'), reviewController.createReview);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getTourWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

module.exports = router;