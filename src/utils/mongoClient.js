const config = require('config');
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${config.mongoDB.username}:${config.mongoDB.password}@${config.mongoDB.host}?retryWrites=true&w=majority&maxIdleTimeMS=300000`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
    } else {
        console.log("MongoDB connected successfully for srv:", uri);
    }
});
const Collections = Object.freeze({
    VIDEOS: {
        db: 'videoFetcher',
        collection: {
            VIDEOS_DATA: 'videosDataYT'
        }
    }
});

async function find(db, collection, query, options = {}) {
    try {
        const database = client.db(db);
        const dbCollection = database.collection(collection);
        return await dbCollection.find(query, options).toArray();
    } catch (ex) {
        throw ex
    }
}

async function findOne(db, collection, query, options = {}) {
    try {
        const database = client.db(db);
        const dbCollection = database.collection(collection);
        return await dbCollection.findOne(query, options);
    } catch (ex) {
        throw ex
    }
}

async function findWithSort(db, collection, query, options = {}, sort) {
    try {
        const database = client.db(db);
        const dbCollection = database.collection(collection);
        return await dbCollection.find(query, options).sort(sort).toArray()
    } catch (ex) {
        throw ex;
    }
}

function getCollection({ db, collection }) {
    try {
        const database = client.db(db);
        const dbCollection = database.collection(collection);
        return dbCollection;
    } catch (ex) {
        throw ex;
    }
}

async function updateOne(db, collection, query, updateOptions, options = {}) {
    try {
        const database = client.db(db);
        const dbCollection = database.collection(collection);
        return await dbCollection.updateOne(query, updateOptions, options);
    } catch (ex) {
        throw ex;
    }
}

async function aggregation(db, collection, aggregation) {
    try {
        const database = client.db(db);
        const dbCollection = database.collection(collection);
        return await dbCollection.aggregate(aggregation).toArray();
    } catch (ex) {
        console.log('=ex', ex);
        throw ex
    }
}

async function insertOne(db, collection, query) {
    try {
        const database = client.db(db);
        const dbCollection = database.collection(collection);
        return await dbCollection.insertOne(query);
    } catch (ex) {
        throw ex
    }
}

async function insertMany(db, collection, query, options = {}) {
    try {
        const database = client.db(db);
        const dbCollection = database.collection(collection);
        return await dbCollection.insertMany(query, options);
    } catch (ex) {
        throw ex
    }
}


module.exports = {
    Collections,
    find,
    updateOne,
    getCollection,
    aggregation,
    insertOne,
    findWithSort,
    findOne,
    insertMany
};
