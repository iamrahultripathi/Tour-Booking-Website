// const fs = require('fs');
const AppError = require('../utils/apperror');
const Tour = require('./../models/tourModel');
// const APIFeatures = require('./../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
const factory = require('./handlerFactory')

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// exports.checkID = (req, res, next, val) => {
//     console.log(`Tour id is ${val}`)
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid id'
//         });
//     }
//     next();
// };

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         });
//     }
//     next();
// };

// exports.getAllTours = (req, res) => {
//     console.log(req.requestTime)
//     res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         results: tours.length,
//         data: {
//             tours
//         }
//     })
// }

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTours = factory.getAll(Tour);

// exports.getAllTours = catchAsync(async(req, res, next) => {
//         //EXECUTE QUERY
//         const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
//         const tours = await features.query;
//         //SEND RESPONSE
//         res.status(200).json({
//             status: 'success',
//             results: tours.length,
//             data: {
//                 tours
//             }
//         })
//     })

// exports.getAllTours = async(req, res) => {
//     try {
//         // console.log(req.query);

//         //BUILD QUERRY

//         //1A) FILTERING
//         // const queryObj = {...req.query }
//         // const excludedFields = ['page', 'sort', 'limit', 'fields']
//         // excludedFields.forEach(el => delete queryObj[el]);

//         // //1B) ADVANCED FILTERING
//         // let queryStr = JSON.stringify(queryObj);
//         // queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, match => `$${match}`);
//         // console.log(JSON.parse(queryStr));

//         // let query = Tour.find(JSON.parse(queryStr));

//         //2) SORTING
//         // if (req.query.sort) {
//         //     const sortBy = req.query.sort.split(',').join(' ');
//         //     query = query.sort(sortBy);
//         // } else {
//         //     query = query.sort('-createdAt')
//         // }

//         //3) LIMITING
//         // if (req.query.fields) {
//         //     const fields = req.query.fields.split(',').join(' ');
//         //     query = query.select(fields)
//         // } else {
//         //     query = query.select('-__v')
//         // }


//         //4) PAGING
//         // const page = req.query.page * 1 || 1;
//         // const limit = req.query.limit * 1 || 100;
//         // const skip = (page - 1) * limit;

//         // query = query.skip(skip).limit(limit)

//         // if (req.query.page) {
//         //     const numTours = await Tour.countDocuments();
//         //     if (skip >= numTours) throw new Error('This page does not exist!')
//         // }

//         //EXECUTE QUERY
//         const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
//         const tours = await features.query;
//         // const tours = await query;

//         // const query = await Tour.find(queryObj);

//         // const query = Tour.find({
//         //     duration: 5,
//         //     difficulty: 'easy'
//         // });

//         // const query = Tour.find().where('duration').equals(5).where('difficulty').equals('easy');


//         //SEND RESPONSE
//         res.status(200).json({
//             status: 'success',
//             results: tours.length,
//             data: {
//                 tours
//             }
//         })
//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         })
//     }
// }

// exports.getTour = (req, res) => {
//     console.log(req.params)
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id)

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour
//         }
//     })
// }

// exports.createTour = (req, res) => {
//     // console.log(req.body);
//     const newID = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({ id: newID }, req.body);

//     tours.push(newTour);
//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
//     res.status(201).json({
//             status: 'success',
//             data: {
//                 tour: newTour
//             }

//         })
//     })
// }

exports.getTour = factory.getOne(Tour, { path: 'reviews' })

// exports.getTour = catchAsync(async(req, res, next) => {
//         const tour = await Tour.findById(req.params.id).populate('reviews');
//         if (!tour) {
//             return next(new AppError('No tour found with that id', 404))
//         }
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 tour
//             }
//         })
//     })

// exports.getTour = async(req, res) => {
//     try {
//         const tour = await Tour.findById(req.params.id);
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 tour
//             }
//         })
//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         })
//     }
// }

exports.createTour = factory.createOne(Tour);

// exports.createTour = catchAsync(async(req, res, next) => {
//         const newTour = await Tour.create(req.body);
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 tour: newTour
//             }
//         })
//     })

// exports.createTour = async(req, res) => {
//     try {

//         // const newTour = new Tour({})
//         // newTour.save();

//         const newTour = await Tour.create(req.body);
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 tour: newTour
//             }
//         })
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: 'Invalid data sent!'
//         })
//     }
// }

// exports.updateTour = (req, res) => {

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<Updated tour here...>'
//         }
//     })
// }

exports.updateTour = factory.updateOne(Tour);

// exports.updateTour = catchAsync(async(req, res, next) => {
//         const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         })
//         if (!tour) {
//             return next(new AppError('No tour found with that id', 404))
//         }
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 tour
//             }
//         })
//     })

// exports.updateTour = async(req, res) => {
//     try {
//         const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         })
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 tour
//             }
//         })
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: 'Invalid data sent!'
//         })
//     }
// }

// exports.deleteTour = (req, res) => {

//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// }

exports.deleteTour = factory.deleteOne(Tour);

// exports.deleteTour = catchAsync(async(req, res, next) => {
//         const tour = await Tour.findByIdAndDelete(req.params.id);
//         if (!tour) {
//             return next(new AppError('No tour found with that id', 404))
//         }
//         res.status(204).json({
//             status: 'success',
//             data: null
//         })
//     })

// exports.deleteTour = async(req, res) => {
//     try {
//         await Tour.findByIdAndDelete(req.params.id);
//         res.status(204).json({
//             status: 'success',
//             data: null
//         })
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: 'Invalid data sent!'
//         })
//     }
// }

exports.getTourStats = catchAsync(async(req, res, next) => {
        const stats = await Tour.aggregate([{
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    maxPrice: { $max: '$price' },
                    minPrice: { $min: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }
            // $match: {_id: {$ne: 'EASY'}}
        ])
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })
    })
    // exports.getTourStats = async(req, res) => {
    //     try {
    //         const stats = await Tour.aggregate([{
    //                 $match: { ratingsAverage: { $gte: 4.5 } }
    //             },
    //             {
    //                 $group: {
    //                     _id: { $toUpper: '$difficulty' },
    //                     numTours: { $sum: 1 },
    //                     numRatings: { $sum: '$ratingsQuantity' },
    //                     avgRating: { $avg: '$ratingsAverage' },
    //                     avgPrice: { $avg: '$price' },
    //                     maxPrice: { $max: '$price' },
    //                     minPrice: { $min: '$price' }
    //                 }
    //             },
    //             {
    //                 $sort: { avgPrice: 1 }
    //             }
    //             // $match: {_id: {$ne: 'EASY'}}
    //         ])
    //         res.status(200).json({
    //             status: 'success',
    //             data: {
    //                 stats
    //             }
    //         })
    //     } catch (err) {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: 'Invalid data sent!'
    //         })
    //     }
    // }

exports.getMonthlyPlan = catchAsync(async(req, res, next) => {
        const year = req.params.year * 1;
        const plan = await Tour.aggregate([{
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStats: { $sum: 1 },
                    tours: { $push: '$name' },

                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numTourStats: -1 }
            }
        ])
        res.status(200).json({
            status: 'success',
            data: {
                plan
            }
        })
    })
    // exports.getMonthlyPlan = async(req, res) => {
    //     try {
    //         const year = req.params.year * 1;
    //         const plan = await Tour.aggregate([{
    //                 $unwind: '$startDates'
    //             },
    //             {
    //                 $match: {
    //                     startDates: {
    //                         $gte: new Date(`${year}-01-01`),
    //                         $lte: new Date(`${year}-12-31`)
    //                     }
    //                 }
    //             },
    //             {
    //                 $group: {
    //                     _id: { $month: '$startDates' },
    //                     numTourStats: { $sum: 1 },
    //                     tours: { $push: '$name' },

//                 }
//             },
//             {
//                 $addFields: { month: '$_id' }
//             },
//             {
//                 $project: {
//                     _id: 0
//                 }
//             },
//             {
//                 $sort: { numTourStats: -1 }
//             }
//         ])
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 plan
//             }
//         })
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err
//         })
//     }
// }

exports.getTourWithin = catchAsync(async(req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng)
        next(new AppError('Please provide latitude and longitude in the format lat,lng.', 400))

    const tours = await Tour.find({
        startLocation: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat], radius
                ]
            }
        }
    });

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            data: tours
        }
    })
});

exports.getDistances = catchAsync(async(req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
    if (!lat || !lng)
        next(new AppError('Please provide latitude and longitude in the format lat,lng.', 400))
    const distances = await Tour.aggregate([{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ]);
    res.status(200).json({
        status: 'success',
        data: {
            data: distances
        }
    })
});