"use strict";

var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var nodemailer = require("nodemailer");

var sendGridTransport = require("nodemailer-sendgrid-transport");

var requireLogin = require('../middleware/requireLogin');

var Post = mongoose.model("Post");
var transporter = nodemailer.createTransport(sendGridTransport({
  auth: {
    api_key: "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"
  }
}));
router.get('/allpost', function (req, res) {
  Post.find().then(function (posts) {
    res.json({
      posts: posts
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.get('/posts', function (req, res) {
  Post.find().then(function (posts) {
    res.json({
      posts: posts
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post('/createpost', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      pic = _req$body.pic;

  if (!title) {
    return res.status(422).json({
      error: "Plase add all the fields"
    });
  } // req.user.password = undefined


  var post = new Post({
    title: title,
    photo: pic,
    postedBy: "admin"
  });
  post.save().then(function (result) {
    res.json({
      post: result
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.put('/vote', requireLogin, function (req, res) {
  var _req$body2 = req.body,
      postId = _req$body2.postId,
      userId = _req$body2.userId;
  Post.findByIdAndUpdate(postId, {
    $push: {
      votes: userId
    }
  }, {
    "new": true
  }).exec(function (err, result) {
    if (err) {
      return res.status(422).json({
        error: err
      });
    } else {
      transporter.sendMail({
        to: "makskks@gmail.com",
        from: "mahenmondal111@gmail.com",
        subject: "E-voting ",
        html: "\n                <h3>,You has given your vote successfully to ".concat(result.title, "  </h3>\n                ")
      });
      res.json(result);
    }
  });
});
module.exports = router;