const express = require('express');
const cors = require('cors')
//const cookieParser = require('cookie-parser');
const urlRouter = require('./routes/url.controller')
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoDBEndpoint = process.env.MONGODB_URI;
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true}, { useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to mongo db'));

app.use(cors());

app.use('/api', urlRouter);

const port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log("starting at " + port);
})