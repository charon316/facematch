var mysql = require('mysql');
var DB_NAME =  'facematch_demo';

var pool = mysql.createPool({
	host : '127.0.0.1',
	user : 'root',
	password :'2316lsll'
});

pool.on('connection', function(connection) {
  connection.query('SET SESSION auto_increment_increment=1'); 
});

function Picinfo(){
};//end function Picinfo

Picinfo.prototype.getTotalNum = function (callback) {
  pool.getConnection(function (err, connection) {
	  //use database DB_NAME
    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
      if (err) {
        console.log("USE Error: " + err.message);
        return;
      }
      // console.log('USE succeed');
  	});//end connection.query

  	var getTotalNum_Sql = "SELECT MAX(PicId) AS total FROM picpath"
  	connection.query(getTotalNum_Sql, function (err, result) {
  	  if (err) {
  		console.log("query Error:" + err.message);
  		return;
  	  }
  	  connection.release();
  	  result = JSON.stringify(result);
      // console.log('original totalnum:' + result);
  	  result = result.slice(10,-2);
      // console.log('totalnum:' + result);
      callback(err,result);
  	});//end connection.query
  });//end pool.connection
};//end getTotalNum

Picinfo.prototype.getPath = function (picid, callback) {
  pool.getConnection(function (err, connection) {
    //use database DB_NAME
    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
      if (err) {
        console.log("USE Error: " + err.message);
        return;
      }
      // console.log('USE succeed.');
    });//end connection.query

    var getPath_Sql = "SELECT PicPath FROM picpath WHERE PicId = ?";

    connection.query(getPath_Sql, [picid], function (err, result) {
      if (err) {
        console.log("getPath Error:" + err.message);
        return;
      }
      connection.release();
      result = JSON.stringify(result);
      // console.log('original path:' + result);
      result = result.slice(13,-3);
      // console.log("path:" + result);
      callback(err,result);
      });//end connection.query
  });//end pool.getConnection
};//end getPath

Picinfo.prototype.getScore = function (picid, callback) {
  pool.getConnection(function (err, connection) {
    var useDbSql = 'USE ' + DB_NAME;
    connection.query(useDbSql, function (err) {
      if (err) {
        console.log('USE Error: ' + err.message);
        return;
      }
      // console.log('USE succeed.');
    });//end connection.query

    var getScore_Sql = "SELECT Score FROM picpath WHERE PicId = ?";

    connection.query(getScore_Sql, [picid], function (err, result) {
      if (err) {
        console.log("getScore Error:" + err.message);
        return;
      }
      connection.release();
      result = JSON.stringify(result);
      // console.log('original score:' + result);
      result = result.slice(10,-2);
      callback(err,result);
    });//end connection.query
  });//end pool.getConnection
};//end getScore

Picinfo.prototype.setScore = function (picid, newScore, callback) {
  console.log('setScore used.');
  console.log('set ' + picid + '\'s score');
  pool.getConnection(function (err, connection) {
    var useDbSql = 'USE ' + DB_NAME;
    connection.query(useDbSql, function (err) {
      if (err) {
        console.log('USE Error: ' + err.message);
        return;
      }
      console.log('database use succeed.');
    });//end connection.query

    var setScore_Sql = "UPDATE picpath SET Score =? WHERE PicId = ?";

    connection.query(setScore_Sql, [newScore,picid], function (err) {
      if (err) {
        console.log("setScore Error:" + err.message);
        return;
      }
      console.log('update succeed.');
      connection.release();
      callback(err)
    });//end connection.query
  });//end pool.getConnection
};//end setScore

module.exports = Picinfo;
