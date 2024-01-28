
const routes = (app) => {
app.get('/healthCheck', async (req, res, next) => {
    try {
        return res.status(200).send('Healthy!');
    } catch (err) {
        return next(err);
    }
});
}
module.exports = {
    routes,
};
