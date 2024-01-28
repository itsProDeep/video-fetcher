const config = require('config');
const MongoClient = require('../../utils/mongoClient');



const refreshData = async (videoDetails) => {
    try {
            const res = await MongoClient.insertOne(MongoClient.MongoDBCollections.VIDEOS.name, MongoClient.MongoDBCollections.VIDEOS.collections.VIDEOS_DATA, videoDetails[0]);
            console.log('res', res);
    } catch(ex) {
        console.log(ex)
        throw (ex);
    }
}

module.exports = {
    refreshData
}