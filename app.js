const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const viewRouter = require('./routes/viewRoutes')
const AppError = require('./utils/apperror')
const globalErrorHandler = require('./controller/errorController')

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1) GLOBAL Middlewares
// Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// Set Security HTTP headers
// app.use(helmet());
app.use(
        helmet({
            crossOriginEmbedderPolicy: false,
            crossOriginResourcePolicy: {
                allowOrigins: ['*']
            },
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ['*'],
                    scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"]
                }
            }
        })
    )
    // Development Login
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, Please try again in an hour!'
})
app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '10kb'
}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Pevent parameter pollution
app.use(hpp({
    whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize', 'difficulty', 'price']
}));


// app.use((req, res, next) => {
//     console.log('Hello from middleware');
//     next();
// })

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

//3) Routes


app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server!`
    // })
    // const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    // err.status = 'fail'
    // err.statusCode = 404

    // next(err);

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app;