const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({

 firstName: {
   type: String,
   required: true,
 },
 lastName: {
   type: String,
   required: true,
 },
 age: {
     type: Number,
     min: [1, 'Please enter a number greater than 1'],
     max: [120, 'Please enter a number greater than 120'],
     required: true,
 },
 createdOn: {
    type: Date,
    timestamp: Date.now,
  }
 });

const FriendsModel = mongoose.model('Friends', FriendsSchema);

module.exports = FriendsModel;