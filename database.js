'use strict';

var mongoose = require('mongoose');
 /*
mongoose.connect('mongodb://localhost/pantrytest', function(err) {

    if(err) {
        console.log('Failed connecting to Mongodb!');
    } else {
        console.log('Successfully connected');
    }

});

*/

//db.collection('inventory').find().toArray(function(err, results);

mongoose.connect('mongodb://admin:admin.password@ds229909.mlab.com:29909/pantry', { useNewUrlParser: true } , function(err) {

    if(err) {
        console.log('Failed connecting to Mongodb!');
    } else {
        console.log('Successfully connected to mlab instance!');
    }

});
