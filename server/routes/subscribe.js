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

    // Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
    // .exec((err, subscribe) => {
    //     if (err) return res.status(400).send(err);
    //     let result = false;
    //     if (subscribe.length !== 0 ){
    //         result = true
    //     }
    //     res.status(200).json({ success: true, subscribed: result })
    // })
  Subscriber.find({
    'userTo': req.body.userTo,
    'userFrom': req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, subcribed: result });
  });

  //userTo를 구독하는 모든케이스가 subscribe에 들어갈것이다
});

router.post("/subscribe", (req, res) => {

  //userTo와 userFrom 을 저장해야됨
  const subscribe= new Subscriber(req.body) //인스턴스만들기. 인스턴스에다가 모든 불러온 정보들 가져오기 
  subscribe.save((err, doc)=> {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true });
  })

});


router.post("/unSubscribe", (req, res) => {
  //Subscriber 콜렉션에 userTo와 userFrom이 담겨있는데 그걸 찾아서 없애줘야함

    Subscriber.findOneAndDelete({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    }).exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, doc });
    });
});



module.exports = router;
