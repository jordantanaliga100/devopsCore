// 404 handler
const NotFound = (req, res, next) => {
    res.status(404).send("<h3>Route Does not Exist</h3><a href='/'>Go Back</a>");
    next();
};
// Global error handler
const GlobalException = (err, req, res, next) => {
    console.log('HITTING THE CUSTOM ERROR', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    // send response only if headers not sent yet
    if (!res.headersSent) {
        res.status(statusCode).json({ ERROR: message });
    }
    next();
};
export const BottomMiddlewares = [NotFound, GlobalException];
//# sourceMappingURL=Bottom.js.map