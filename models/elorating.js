var mysql = require('mysql');
var DB_NAME =  'facematch_demo';
var Picinfo = require('../models/picinfo.js');

var pool = mysql.createPool({
	host : '127.0.0.1',
	user : 'root',
	password :'2316lsll'
});

pool.on('connection', function(connection) {
  connection.query('SET SESSION auto_increment_increment=1'); 
});

function Elorating () {};

Elorating.prototype.countScore = function (winnerNum, winnerScore, loserNum, loserScore,callback) {
  // console.log('countScore used.');
  // console.log('winnerNum:' + winnerNum);
  // console.log('winnerScore:' + winnerScore);
  // console.log('winnerScore type:' + typeof(winnerScore));
  // console.log('loserNum:' + loserNum);
  // console.log('loserScore:' + loserScore);
  var K=32;
  var Sw=1;
  var Sl=0;
  loserScore = Number(loserScore);
  winnerScore = Number(winnerScore);

  var Ew=1/(1+Math.pow(10,(loserScore-winnerScore)/400));
  var El=1/(1+Math.pow(10,(winnerScore-loserScore)/400));
  var Nw=winnerScore+K*(Sw-Ew);
  var Nl=loserScore+K*(Sl-El);
  // console.log('Nw:' + Nw);
  // console.log('Nl:' + Nl);

  var setWinnerScore = new Picinfo();
  setWinnerScore.setScore(winnerNum, Nw, callback);
  var setLoserScore = new Picinfo();
  setLoserScore.setScore(loserNum, Nl, callback);
  callback(err);
};

module.exports = Elorating;