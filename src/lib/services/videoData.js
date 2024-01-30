const { getVideosDataDao } = require('../dao/videos-data-dao');

const getVideosData = async (pageNo, pageSize) => {
    try {
        return getVideosDataDao(pageNo, pageSize);
    } catch (err) {
        throw err;
    }
}

const getSearchData = async (pageNo, pageSize) => {
    try {
        
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getVideosData,
    getSearchData
}