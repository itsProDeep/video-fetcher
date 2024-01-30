const config = require('config');
const MongoClient = require('../../utils/mongoClient');
const {redisClient} = require('../../utils/redisClient');


const refreshData = async (videoDetails) => {
    try {
            const res = await MongoClient.insertMany(MongoClient.Collections.VIDEOS.db, MongoClient.Collections.VIDEOS.collection.VIDEOS_DATA, videoDetails, {continueOnError: true, ordered: false});
            if(res.acknowledged) {
                return 'Data successfully inserted!'
            } else return 'Some error occured in refreshData'
    } catch(ex) {
        console.log(ex)
        throw (ex);
    }
}

const getVideosDataDao = async (pageNo, pageSize) => {
    try  {
      
        const redisData = await redisClient.get('video_data' ,{pageNo: 1, pageSize: 10});
        if(redisData && redisData.length) {
            
        }
        const videosData = await MongoClient.find(MongoClient.Collections.VIDEOS.db, MongoClient.Collections.VIDEOS.collection.VIDEOS_DATA,
            {del: 0},
            {
                sort: {publishTime: -1},
                skip: (pageNo - 1) * pageSize,
                limit: pageSize
            });
            console.log('videosData', videosData);
            await redisClient.set('myKey', 'Hello, Redis!');
    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    refreshData,
    getVideosDataDao
}