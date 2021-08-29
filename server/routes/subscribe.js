const express = require("express");
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscribe
//=================================

router.post("/subscribeNumber", (req, res) => {

    Subscriber.find({'userTo': req.body.userTo})
    .exec((err, subscribe) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({success:true, subscribeNumber: subscribe.length})
    })

  //userTo를 구독하는 모든케이스가 subscribe에 들어갈것이다 
});

router.post("/subscribed", (req, res) => {
//   Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
//     if (err) return res.status(400).send(err);
//     return res
//       .status(200)
//       .json({ success: true, subscribeNumber: subscribe.length });
//   });

    Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
    .exec((err, subscribe) => {
        if (err) return res.status(400).send(err);
        let result = false;
        if (subscribe.length !== 0 ){
            result = true
        }
        res.status(200).json({ success: true, subscribed: result })
    })

  //userTo를 구독하는 모든케이스가 subscribe에 들어갈것이다
});


module.exports = router;
