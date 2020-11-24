const { response } = require('express');
const express = require('express');
const UrlModel = require('../db/url.model');
const router = express.Router();

router.post('/', (req, res) => {

    if(!req.body.originUrl || !req.body.unbrandedUrl) {
        res.status(404).send({message: "Must include originUrl"});
    }
    let url = null
    UrlModel.addUrl(req.body)
        .then(function (response) {
            url = response;
            return res.status(200).send(response);
        }, function (error) {
            return res.status(500).send("Issue adding url");
        })
        .then(function () {
            console.log("insert data successfully!")
        })
        .then(function () {
            console.log(url)
        })
        .catch(function() {
            console.error("couldn't insert url")
        })
});

router.get('/url/:shortUrl', (req, res) => {
    const shortUrl = UrlModel.findByShortUrl(req.params.shortUrl)
    if (shortUrl == null) {
        res.sendStatus(404)
    }
    
    res.redirect(shortUrl.originUrl)
});

router.get('/', (req, res) => {
    UrlModel.getAllUrl().then(urls => res.send(urls))
});

// router.post('/authenticate', function (req, res) {
//     UserModel.getUseByUserName(req.body.username)
//         .then((user) => {
//             if (user.password === req.body.password) {
//                 res.status(200).send(user);
//             } else {
//                 res.status(404).send('Failed to authenticate user!');
//             }
//         })
// });

module.exports = router;