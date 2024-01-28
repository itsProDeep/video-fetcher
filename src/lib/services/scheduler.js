const schedule = require('node-schedule');
const googleapis = require('googleapis')
const axios = require('axios');
const config = require('config');
const { refreshData } = require('../dao/videos-data-dao');

async function getYouTubeData() {
    try {
      const apiUrl = config.youtubeData.apiUrl
      const apiKey = config.youtubeData.apiKey
      const params = {
        part: 'snippet',
        q: 'football',
        type: 'video',
        maxResults: 50,
        order: 'date',
        publishedAfter: '2024-01-01T00:00:00Z',
        key: apiKey,
      };
  
      const response = await axios.get(apiUrl, { params });
  
      if (response.status === 200) {
        const videos = response.data.items;
        const videoDetails = videos.map(video => {
            return {
              title: video.snippet.title,
              description: video.snippet.description,
              publishTime: video.snippet.publishTime,
              thumbnails: video.snippet.thumbnails,
              cAt: new Date().valueOf(),
              uAt: new Date().valueOf()
            };
          });
          await refreshData(videoDetails);
        // return result;
      } else {
        console.error('Error fetching data from YouTube API:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      return null;
    }
  }
  getYouTubeData();

const startScheduler = () => {
    try {
        // refresh YT videos data every 20 seconds
        // schedule.scheduleJob('*/20 * * * * *', getYouTubeData);
    } catch (err) {
        logger.error(err);
    }
};

module.exports = {
    startScheduler,
};
