const { getVideosDataDao, getSearchDataDao } = require('../dao/videos-data-dao');

const getVideosData = async (pageNo, pageSize) => {
    try {
        return getVideosDataDao(pageNo, pageSize);
    } catch (err) {
        throw err;
    }
}

const getSearchData = async (searchTerm) => {
    try {
        return getSearchDataDao(searchTerm);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getVideosData,
    getSearchData
}