var Utility = require('../models/utility');
var Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const { nextTick } = require('async');
const category = require('../models/category');


exports.utility_list = function(req, res) {
    Category.find({ type: 'Utility' })
        .exec(function(err, utility_list) {
            if (err) { return next(err); }
            res.render('utility_list', { title: 'Utility List', list_utility: utility_list });
        });
};

exports.utility_detail = function(req, res) {
    Category.findById({ _id: req.params.id }).
        exec(function(err, results) {
            Utility.find({ 'title': results.title }).
                populate('skins').
                exec(function(err, utility_list) {
                    if (err) { return next(err); }
                    if (typeof utility_list !== 'undefined' && utility_list.length > 0) {
                        res.render('utility_detail', { title: results.title + ' Skins', skins_list: utility_list, utility: results });
                    }
                    else {
                        res.render('utility_detail', { title: results.title + ' Skins', utility: results });
                    }
                });
        });
};

exports.utility_create_get = function(req, res) {
    res.render('utility_form', { title: 'Create New Utility'});
};

exports.utility_create_post = [
    body('name', 'Utility name must be specified.').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        var utility = new Category({
            type: 'Utility',
            title: req.body.name,
            image: '/images/' + req.body.image
        });
        if (!errors.isEmpty()) {
            res.render('utility_form', { title: 'Create New Utility', errors: errors.array() });
            return;
        }
        else {
            category.findOne({ title: req.body.name }).
                exec(function(err, found_utility) {
                    if (err) { return next(err); }
                    if (found_utility) {
                        res.redirect(found_utility.utility_url);
                    }
                    else {
                        utility.save(function(err) {
                            if (err) { return next(err); }
                            res.redirect(utility.utility_url);
                        });
                    }
                });
        }
    }
];

exports.utility_delete_get = function(req, res) {
    category.findById({ _id: req.params.id }).
        exec(function(err, results) {
            if (err) { return next(err); }
            if (results == null ) {
                res.redirect('/catalog/utility');
            }
            else {
                res.render('utility_delete', { title: 'Delete Utility: ' + results.title });
            }
        });
};

exports.utility_delete_post = function(req, res) {
    category.findByIdAndRemove({ _id: req.params.id }).
        exec(function(err, results) {
            if (err) { return next(err); }
            res.redirect('/catalog/utility');
        });
};

exports.utility_update_get = function(req, res) {
    res.send('NOT IMPEMENTED: utility update GET');
};

exports.utility_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: utility update POST');
};
