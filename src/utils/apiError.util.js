class ApiError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.errors = errors
    }
}

export {ApiError}

// Note: Error's constructor only has ONE parameter: message


// status code and message comes from user directly
// super(message) is done to hand over the message to the main class Error to set it up properly
// thsi.data = null: ApiError's shape is meant to mirror what a successful response might look like (which might have a data field containing real content) — but since this is an ERROR, there's no real data to return, so it's explicitly set to null, signaling "nothing useful here, this is a failure.

// errros are the custom field of data we user give 

