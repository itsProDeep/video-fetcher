const { getSearchData, getVideosData } = require("../lib/services/videoData");

const routes = (app) => {
app.get('/healthCheck', async (req, res, next) => {
    try {
        return res.status(200).send('Healthy!');
    } catch (err) {
        return next(err);
    }
});

app.get('/videos', async (req, res, next) => {
    try {
        const pageNo = req.query && req.query.pageNo ? parseInt(req.query.pageNo, 10) : 1;
        const pageSize = req.query && req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
        const videosData = await getVideosData(pageNo, pageSize);
        return res.send(videosData);
    } catch (err) {
        return next(err);
    }
});

app.get('/search/videos', async (req, res, next) => {
    try {
        if(!req.query.searchTerm) return await getVideosData(1, 10);
        const searchTerm = req.query.searchTerm;
        const searchData = await getSearchData(searchTerm);
        return res.send(searchData);
    } catch (err) {
        return next(err);
    }
});

}
module.exports = {
    routes,
};
