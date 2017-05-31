const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var util= require('util');

const sql= require('mssql');

const mssqlConfig= require('../config/database-mssql');

// User Schema
// const UserSchema = mongoose.Schema({
//   name: {
//     type: String
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   username: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

const UserSchema={
  username:'',
  password:''

};
const User = module.exports = mongoose.model('User', UserSchema);
//mongoose.model('User', UserSchema);




module.exports.getUserById = function(id, callback){
  //User.findById(id, callback);
   var conn= new sql.Connection(mssqlConfig);
  var req= new sql.Request(conn);
  conn.connect(function(err){
          if(err){
            callback(err);
            return;
          }

          var Sqlquery="Select ID from Users where ID= " ;
         // Sqlquery+= (queryString.username + ''+ queryString.password)
          Sqlquery+=util.format("('%s')", id);
          req.query(Sqlquery, function(err, recordSet){
            if(err){
              console.log(err);
              callback(err);
            }else{
              if(recordSet[0]){
                callback(null, recordSet[0]);
              }else{
                callback('Invalid Id')
              }
              
            }
            conn.close();
          });
  });
}

module.exports.getUserByUsername = function(username, callback){

  var conn= new sql.Connection(mssqlConfig);
  var req= new sql.Request(conn);
  // const query = {username: username}
  // User.findOne(query, callback);
  conn.connect(function(err){
          if(err){
            console.log(err);
            callback(err);
            return;
          }

          var Sqlquery="Select password from Users where username= " ;
         // Sqlquery+= (queryString.username + ''+ queryString.password)
          Sqlquery+=util.format("('%s')", username);
          console.log(Sqlquery);
          req.query(Sqlquery, function(err, recordSet){
            if(err){
              console.log(err);
              callback(err);
            }else{
              if(recordSet[0]){
                User.password= recordSet[0].password;
                User._id=recordSet[0].ID;
                User.username=recordSet[0].username;
                callback(null, User);
              }else{
                callback('Wrong username or password')
              }
              
            }
            conn.close();
          });
  });
};

module.exports.addUser = function(newUser, callback){

   var conn= new sql.Connection(mssqlConfig);
  var req= new sql.Request(conn);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;


        conn.connect(function(err){
          if(err){
            console.log(err);
            return
          }

          var Sqlquery="INSERT into Users (UserName, Password) values " ;
         // Sqlquery+= (queryString.username + ''+ queryString.password)
          Sqlquery+=util.format("('%s', '%s')", newUser.username, newUser.password);
          console.log(Sqlquery);
          req.query(Sqlquery, function(err, recordSet){
            if(err){
              console.log(err);
            }else{
              console.log(recordSet);
            }
            conn.close();
          },callback);
        });
      //newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}