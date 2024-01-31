const config = require('config');
const MongoClient = require('../../utils/mongoClient');
const {redisClient} = require('../../utils/redisClient');


const refreshData = async (videoDetails) => {
    try {
            const res = await MongoClient.insertMany(MongoClient.Collections.VIDEOS.db, MongoClient.Collections.VIDEOS.collection.VIDEOS_DATA, videoDetails, {ordered: false, silent: true});
            if(res.acknowledged) {
                await redisClient.del('video_data:*');
                return 'Data successfully inserted!'
            } else return 'Some error occured in refreshData'
    } catch(ex) {
        throw (ex);
    }
}

const getVideosDataDao = async (pageNo, pageSize) => {
    try  {
        const redisKey = `video_data:${pageNo}:${pageSize}`;
        const redisData = await redisClient.get(redisKey);
        if(redisData && redisData.length) {
            return {videos: JSON.parse(redisData)};
        }
        const videosData = await MongoClient.find(MongoClient.Collections.VIDEOS.db, MongoClient.Collections.VIDEOS.collection.VIDEOS_DATA,
            {del: 0},
            {
                sort: {publishTime: -1},
                skip: (pageNo - 1) * pageSize,
                limit: pageSize
            });
            await redisClient.set(redisKey, JSON.stringify(videosData),  'EX', 20);
            return {videos: videosData};
    } catch (ex) {
        throw ex;
    }
}

const getSearchDataDao = async (searchTerm) => {
    try  {
        const regexPattern = new RegExp(searchTerm, 'i');
        const result = await MongoClient.find( MongoClient.Collections.VIDEOS.db, MongoClient.Collections.VIDEOS.collection.VIDEOS_DATA,
           { del: 0, 
            $or: [
            { title: { $regex: regexPattern } },
            { description: { $regex: regexPattern } },
          ]});
          return result;
    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    refreshData,
    getVideosDataDao,
    getSearchDataDao
}