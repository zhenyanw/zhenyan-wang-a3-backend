const express = require('express');
const cors = require('cors')
//const cookieParser = require('cookie-parser');
const urlRouter = require('./routes/url.controller')
//const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoDBEndpoint = "mongodb+srv://zhenyanw:Nicole0101@cluster.jerxy.mongodb.net/UrlTable?retryWrites=true&w=majority"
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to mongo db'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser());

app.use(cors());

app.use('/', urlRouter);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("starting at" + port);
})