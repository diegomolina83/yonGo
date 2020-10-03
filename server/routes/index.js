module.exports = app => {

    // Base URLS
    app.use('/api', require('./plans.routes.js'))
    app.use('/api', require('./auth.routes.js'))
}