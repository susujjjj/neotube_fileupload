const express = require("express");
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

const { Video } = require("../models/Video");
// const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4" || ext !== ".png" || ext !== ".jpeg") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  }, //|| ext !== '.png'
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadVideo", (req, res) => {
  //비디오 정보들을 저장한다.
  const video = new Video(req.body)  

  video.save((err, doc) => { //이렇게하면 모든 정보들이 몽고디비에 저장된다.
    if (err) return res.json({ success : false, err })
    res.status(200).json({ success: true })
  })
  
})


router.post("/thumbnail", (req, res) => {
  let filePath = "";
  let fileDuration = "";
  //비디오정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });


  //썸네일생성
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);
      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});


router.get("/getVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});


// router.post("/getVideos", (req, res) => {
//   //비디오를 db에서 가져와서 클라이언트로 보낸다
//   Video.find()
//     .populate('writer') 
//     //populate을 해줘야지 모든 writer정보를 가져올 수 있습니다. 
//     //만약 populate해주지않으면 writer의 id만 가져올수있다 
//     .exec((err, videos) => {
//       if (err) return res.status(400).send(err);
//       res.status(200).json({success: true, videos})
//     })

// });


module.exports = router;


