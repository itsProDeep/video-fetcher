const redis = require('redis');
const config = require('config');

const redisClient = redis.createClient({
    password: config.redis.password,
    socket: {
        host: config.redis.host,
        port: config.redis.port
    }
});

redisClient.on('connect', () => {
  console.log('Connected to Redis server');
});

redisClient.on('error', (err) => {
  console.error(`Error: ${err}`);
});

redisClient.on('ready', () => {
  console.log('redis is ready to accept connections');
});
redisClient.connect();
module.exports = {
    redisClient
}