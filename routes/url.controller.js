const express = require('express');
const UrlModel = require('../db/url.model');
const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.originUrl) {
        return res.status(404).send({message: "Must include originUrl"});
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

router.get('/ifExist/:urlEnd', (req, res) => {
    UrlModel.findByShortUrl(req.params.urlEnd).then(
        (urls) => {
            if (urls == null) {
                res.send(false);
            } else {
                res.send(true);
            }
        }
    )
});

router.get('/find/:urlEnd', (req, res) => {
    UrlModel.findByShortUrl(req.params.urlEnd).then(url => res.send(url))
});

router.delete('/delete/:urlEnd', function (req, res) {
    UrlModel.deleteByShortUrl(req.params.urlEnd).then(() => res.send("Entry Removed"))
})

router.put('/put/:urlEnd', function (req, res) {
    UrlModel.updateOriginUrl(req.params.urlEnd, req.body.originUrl).then(
        url => {
            res.send(url),
            console.log(url)
        }
    )
})

module.exports = router;