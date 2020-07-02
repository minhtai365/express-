var express = require('express');
// var router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const router = require('./routes/user.route');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({user:[]})
  .write()

  module.exports=db;