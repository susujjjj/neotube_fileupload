const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");
//=================================
//             Comment
//=================================

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body)

  comment.save((err, comment) => {
      if (err) return res.json({success: false, err})

      Comment.find({'_id': comment._id}) //id로 찾는다
      .populate('writer')
      .exec((err, result) => {
          if(err) return res.json({success: false, err})
          res.status(200).json({success:true, result})
          console.log(result ,"result at comment routess")
      })
  })
});



module.exports = router;
