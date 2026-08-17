export const asyncHandler = function (fn) {
    function wrapper(req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(err => next(err))
    }
    return wrapper
}

// Promise.resolve(x) is a completely different, unrelated thing — it's a static helper method that just means: "take this value x, and if it's not already a Promise, wrap it into one that's already resolved." It's not "resolving" anything in the sense of manually settling a Promise you created — it's more like a conversion/safety utility.


// Run the controller. If it fails — however it fails — catch that failure and hand it to next(), so Express's error handler deals with it instead of the app going silent."