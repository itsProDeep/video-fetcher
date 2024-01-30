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
          console.log('video==:>', video);
            return {
              vId: video.id.videoId,
              title: video.snippet.title,
              description: video.snippet.description,
              publishTime: video.snippet.publishTime,
              thumbnails: video.snippet.thumbnails,
              cAt: new Date().valueOf(),
              uAt: new Date().valueOf(),
              del: 0
            };
          });
          const res = await refreshData(videoDetails);
          console.log(res);
      } else {
        console.error('Error fetching data from YouTube API:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      return null;
    }
  }

const startScheduler = () => {
    try {
        // refresh YT videos data every 30 seconds
        // schedule.scheduleJob('*/30 * * * * *', getYouTubeData);
    } catch (err) {
        logger.error(err);
    }
};

module.exports = {
    startScheduler,
};
