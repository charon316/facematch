var express = require('express');
var router = express.Router();
var Picinfo = require('../models/picinfo.js');
var changedNum = 0;
var changedPath = '';
var async = require('async');
var Elorating = require('../models/elorating.js');
var totalNum = 0;

var changePath = function (winnerNumber, loserNumber, winnerside, callback) {
  async.series([
    function judgetheresult(callback) {
      var judgeresult = new Elorating();
      judgeresult.countScore(winnerNumber, global.leftScore, loserNumber, global.rightScore, function (err){
        callback(err);
      });
    },

    function getTotalPath (callback) {
      console.log('--get in function getTotalPath--');
      var realTotalNum = new Picinfo();
      realTotalNum.getTotalNum(function (err, results) {
        console.log('results90:' + results);
        totalNum = results;
        console.log("totalNum91:" + results);
        callback(err,totalNum);
      });
    },

    function getPicPath (callback) {
      console.log('--get in function getPicPath--');
      if (winnerside == "left") {
        console.log('totalNumber92:' + totalNum);
        do {
          changedNum = Math.random() * totalNum;
          changedNum = Math.ceil(changedNum);
        } while (changedNum == global.leftNum)
        console.log('changedNum93:' + changedNum);
        global.rightNum = changedNum;

        var changePicPath = new Picinfo();
        changePicPath.getPath(changedNum, function (err, results) {
          console.log("changeNum94:" + changedNum);
          console.log("results95:" + results);
          console.log("changedPath96:" + changedPath);
          changedPath = results;
          console.log("returnPath97:" + changedPath);
          callback(err,changedPath);
        });
      } else {
        console.log('totalNumber98:' + totalNum);
        do {
          changedNum = Math.random() * totalNum;
          changedNum = Math.ceil(changedNum);
        } while (changedNum == global.leftNum)
        console.log('changedNum99:' + changedNum);
        global.rightNum = changedNum;

        var changePicPath = new Picinfo();
        changePicPath.getPath(changedNum, function (err, results) {
          console.log("changeNum100:" + changedNum);
          console.log("results101:" + results);
          console.log("changedPath102:" + changedPath);
          changedPath = results;
          console.log("returnPath103:" + changedPath);
          callback(err,changedPath);
        });
      }
    },
  ],function (err,results){
    theresult = results;
    console.log('async results104:' + results);
    callback(theresult);
  });
};

/* GET picture changed. */
router.get('/', function(req, res) {
  var winnerside = req.query.side;
  console.log('winnerside:' + winnerside);
  if (winnerside == "#leftimg") {
    // console.log('in #leftimg way');
    // console.log('global.leftNum:' + global.leftNum);
    // console.log('global.rightNum:' + global.rightNum);
    // var winNum = global.leftNum;
    // console.log('winNum:' + winNum);
    // var loseNum = global.rightNum;
    // console.log('loseNum:' + loseNum);
    changePath(global.leftNum, global.rightNum, "left", function (theresult) {
      console.log('theresult[2]:' + theresult[2]);
      res.send();
  });
  } else {
    console.log('in #rightimg way');
    console.log('global.leftNum:' + global.leftNum);
    console.log('global.rightNum:' + global.rightNum);
    changePath(global.rightNum, global.leftNum, "right", function (theresult) {
      res.send();
    })
  }
  
});

module.exports = router;