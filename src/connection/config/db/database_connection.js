var mongojs = require('mongojs');
// var databaseUrl = 'mongodb://admin:password1@ds211708.mlab.com:11708/rhood';
var databaseUrl = 'mongodb://testaccount:testpassword1@ds211708.mlab.com:11708/nbastats';
var collections = ['stocks', 'dividends', 'payments', 'purchasePower'];
var db = mongojs(databaseUrl, collections);

module.exports = db;
