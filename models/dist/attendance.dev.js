"use strict";

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  votes: [{
    type: ObjectId,
    ref: "User"
  }],
  postedBy: {
    type: String
  }
});
mongoose.model("Post", postSchema);