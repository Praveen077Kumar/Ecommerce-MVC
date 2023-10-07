const express = require('express');
const app = express();

const feedRoutes= require('./routes/feed')

//GET /feed/Posts

app.use('/feed',feedRoutes)


app.listen(8000);
