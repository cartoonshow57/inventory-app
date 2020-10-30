var Utility = require('../models/utility');
var Category = require('../models/category');
const { nextTick } = require('async');


exports.utility_list = function(req, res) {
    Category.find({}, 'title image')
        .exec(function(err, utility_list) {
            if (err) { return next(err); }
            res.render('utility_list', { title: 'Utility List', list_utility: utility_list.slice(5, 8) });
        });
};

exports.utility_detail = function(req, res) {
    Category.findById({ _id: req.params.id }).
        exec(function(err, results) {
            Utility.find({ 'title': results.title }).
                populate('skins').
                exec(function(err, utility_list) {
                    if (err) { return next(err); }
                    res.render('utility_detail', { title: results.title + ' Skins', skins_list: utility_list });
                });
        });
};

exports.utility_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: utility create GET');
};

exports.utility_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: utility create POST');
};

exports.utility_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: utility delete GET');
};

exports.utility_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: utility delete POST');
};

exports.utility_update_get = function(req, res) {
    res.send('NOT IMPEMENTED: utility update GET');
};

exports.utility_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: utility update POST');
};
