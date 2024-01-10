const CustomError = require('../Error/CustomError')


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const ErrorHandlingMiddleware = (err, req, res, next) => {

    //Duplicate value error 

    if(err.code === 11000){
        let fieldName = Object.keys(err.keyValue)[0];
        let value = err.keyValue[fieldName];
        fieldName = capitalize(fieldName);
        err.status = 409;
        err.message = `${fieldName} ${value} already exists.`
    }

    if(err.name ===  "ValidationError"){
        err.message = err.message.split(":")[2].trim()
    }
a

if(process.env.NODE_ENV === 'development'){
res.status(err.status || 500).json({ error : err, name: err.name, stack: err.stack, message: err.message, code: err.code , val : err.keyValue});
}else if (process.env.NODE_ENV === 'production'){
    res.status(err.status || 500).json({message : err.message})
}
  };
  
  module.exports = ErrorHandlingMiddleware;
  






// const devErrors = (res, error) => {
//     res.status(error.statusCode).json({
//         status: error.statusCode,
//         message: error.message,
//         stackTrace: error.stack,
//         error: error
//     });
// }

// const castErrorHandler = (err) => {
//     const msg = `Invalid value for ${err.path}: ${err.value}!`
//     return new CustomError(msg, 400);
// }

// const duplicateKeyErrorHandler = (err) => {
//  const email = err.keyValue.email;
//  const msg = `There is already an user with email ${email}. Please use another email!`;
 
//  return new CustomError(msg, 400);
// }

// const validationErrorHandler = (err) => {
//     const errors = Object.values(err.errors).map(val => val.message);
//     const errorMessages = errors.join('. ');
//     const msg = `Invalid input data: ${errorMessages}`;

//     return new CustomError(msg, 400);
// }

// const prodErrors = (res, error) => {
//     if(error.isOperational){
//         res.status(error.statusCode).json({
//             status: error.statusCode,
//             message: error.message
//         });
//     }else {
//         res.status(500).json({
//             status: 'error',
//             message: 'Something went wrong! Please try again later.'
//         })
//     }
// }

// const ErrorHandlingMiddleware= (error, req, res, next) => {
//     error.statusCode = error.statusCode || 500;
//     error.status = error.status || 'error';

//     if(process.env.NODE_ENV === 'development'){
//         devErrors(res, error);
//     } else if(process.env.NODE_ENV === 'production'){
//         if(error.name === 'CastError') error = castErrorHandler(error);
//         if(error.code === 11000) error = duplicateKeyErrorHandler(error);
//         if(error.name === 'ValidationError') error = validationErrorHandler(error);

//         prodErrors(res, error);
//     }
// }