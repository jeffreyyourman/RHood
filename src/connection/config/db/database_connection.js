var mongojs = require('mongojs');
var databaseUrl = 'mongodb://testaccount:testpassword1@ds211708.mlab.com:11708/nbastats';
var collections = ['rhood', 'stocks'];
var db = mongojs(databaseUrl, collections);

module.exports = db;
