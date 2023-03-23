const express = require('express');
const reviewController = require('./../controller/reviewController');
const authController = require('./../controller/authController')
const router = express.Router({ mergeParams: true });

router.use(authController.protect)
router.route('/').post(authController.restrictTo('user'), reviewController.setTourUserIds, reviewController.createReview).get(reviewController.getAllReviews)
router.route('/:id').delete(reviewController.deleteReview).patch(authController.restrictTo('user', 'admin'), reviewController.updateReview).get(authController.restrictTo('user', 'admin'), reviewController.getReview);
module.exports = router;