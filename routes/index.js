var express = require('express');
var router = express.Router();
var Picinfo = require('../models/picinfo.js');
var TITLE = 'FaceMatch';
var leftNum = 1;
var rightNum = 2;
var leftPath = "";
var rightPath = "";
var totalNum = 0;
var async = require('async');

var getPicPath = function (callback) {
  async.series([
    function getTotalPath (callback) {
      var realTotalNum = new Picinfo();
      realTotalNum.getTotalNum(function (err, results) {
        // console.log('results:' + results);
        totalNum = results;
        // console.log("totalNum1:" + results);
        callback(err,totalNum);
      });
    },

    function getLeftPath (callback) {
      // console.log('totalNum99:' + totalNum);
      // console.log("leftNum2:" + global.leftNum);
      global.leftNum = Math.random() * totalNum;
      global.leftNum = Math.ceil(global.leftNum);
      // console.log("leftNum3:" + leftNum);
      var leftPicpath = new Picinfo();
      leftPicpath.getPath(global.leftNum, function (err, results) {
        // console.log("leftNum4:" + leftNum);
        // console.log("results5:" + results);
        // console.log("leftPath6:" + leftPath);
        leftPath = results;
        // console.log("leftPath7:" + leftPath);
        callback(err, leftPath);
      });
    },

    function getRigthPath (callback) {
      // console.log("rightNum8:" + global.rightNum);
      do {
        global.rightNum = Math.random() * totalNum;
        global.rightNum = Math.ceil(global.rightNum);
      } while (global.rightNum == global.leftNum);
      // console.log("rightNum9:" + global.rightNum);
      var rightPicpath = new Picinfo();
      rightPicpath.getPath(global.rightNum, function (err, results) {
        // console.log("rightPath10:" + rightPath);
        rightPath = results;
        // console.log("rightPath11:" + rightPath);
        callback(err, rightPath);
      });
    },

    function getLeftScore (callback) {
      // console.log('global.leftNum:' + global.leftNum);
      var leftPicScore = new Picinfo();
      leftPicScore.getScore(global.leftNum, function (err, results) {
        // console.log('leftScore:' + results)
        global.leftScore = results;
        // console.log('leftSocre:' +leftScore);
        callback(err, global.leftScore);
      })
    },

    function getRightScore (callback) {
      // console.log('global.rightNum:' + global.rightNum);
      var leftPicScore = new Picinfo();
      leftPicScore.getScore(global.rightNum, function (err, results) {
        // console.log('rightScore:' + results)
        global.rightScore = results;
        // console.log('rightSocre:' + rightScore);
        callback(err, global.rightScore);
      })
    },

  ],function (err,results){
    theresult = results;
    // console.log('async results12:' + results);
    callback(theresult);
  });
};

/* GET home page. */ 
router.get('/', function (req, res) {
  getPicPath(function (theresult) {
    // console.log('theresultl3:' + theresult);
    // console.log('totalNum14:' + theresult[0]);
    // console.log("picLeftPath15:" + theresult[1]);
    // console.log("picRightPath16:" + theresult[2]);
    res.render('index', { title: TITLE,
                leftsrc: theresult[1],
                rightsrc: theresult[2],
                leftpicscore: theresult[3],
                rightpicscore: theresult[4]});
    console.log('-----load completed-----');
  });
});

module.exports = router;
