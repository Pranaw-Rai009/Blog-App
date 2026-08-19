export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors || []
    })
}

// import in app.js


// "at same moment the error object is created via ApiError since its thrown its reject promise" — exactly right: the object is built by ApiError's constructor, then throw converts it into a Promise rejection (since the controller is async).

// "it means in asyncHandler its catch(err => next(err)) that will run" — correct, this is precisely what .catch(next) does (shorthand for that exact callback).

// "since then the errHandler runs with the object" — correct — Express sees next was called with an argument, routes to errorHandler, handing it that same object as err.

// Full chain, confirmed accurate in your words: controller throws → ApiError object exists → async rejection carries it → asyncHandler's .catch(next) calls next(err) → Express redirects to errorHandler → errorHandler reads the object and sends the response.

// That's the complete, correct mental model — genuinely solid