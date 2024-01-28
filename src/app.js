const express = require('express');
const router = express.Router();
const app = express();
const scheduler = require('./lib/services/scheduler');
const port = 3000;
const {
    routes,
} = require('./router/router');
app.get('/', (req, res) => {
  res.send('Hello World!');
});

scheduler.startScheduler();

app.listen(port, () => {
  console.log(`Server running on : ${port}`);
});


app.use(router);
routes(app);