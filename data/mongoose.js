const config = require('../config.json');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username : { type : String, index : true },
    password : String,
    authLevel : String,
    locked : Boolean,
    email : String,
    firstName : String,
    lastName : String
});

var locationSchema = new mongoose.Schema({
    locationId : { type : Number, index : true },
    name : String,
    latitude : Number,
    longitude : Number
});

locationSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var purityRptSchema = new mongoose.Schema({
    rptId : { type : Number, index : true },
    rptDate : Date,
    author : String,
    locationId : Number,
    virusPPM : Number,
    contaminantPPM : Number,
    purityCondition : String
});

purityRptSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var sourceRptSchema = new mongoose.Schema({
    rptId : { type : Number, index : true },
    rptDate : Date,
    author : String,
    locationId : Number,
    sourceType : String,
    sourceCondition : String
});

sourceRptSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

mongoose.connect(config.database);

exports.User = mongoose.model('Users', userSchema);
exports.Location = mongoose.model('Locations', locationSchema);
exports.PurityRpt = mongoose.model('PurityRpts', purityRptSchema);
exports.SourceRpt = mongoose.model('SourceRpts', sourceRptSchema);
