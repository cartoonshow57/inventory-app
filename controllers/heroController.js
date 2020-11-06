const async = require('async');
const category = require('../models/category');
var Hero = require('../models/heroes');
const { body, validationResult } = require('express-validator');


exports.hero_list = function(req, res) {
    category.find({ type: 'Hero'})
        .exec(function(err, list_hero) {
            if (err) { return next(err); }
            res.render('hero_list', { title: 'Hero List', hero_list: list_hero });
        });
};

exports.hero_detail = function(req, res) {
    category.findById({ _id: req.params.id }).
        exec(function(err, results) {
            if (err) { return next(err); }
            Hero.find({ 'title': results.title }).
                populate('skins').
                exec(function(err, skins) {
                    if (err) { return next(err); }
                    if (typeof skins !== 'undefined' && skins.length > 0) {
                        res.render('hero_detail', { title: skins[0].title + ' Skins', skins_list: skins, hero: results });
                    }
                    else {
                        res.render('hero_detail', { title: results.title + ' Skins', hero: results });
                    }
                });
        });
};

exports.hero_create_get = function(req, res) {
    res.render('hero_form', { title: 'Create New Hero' });
};

exports.hero_create_post = [
    body('name', 'Hero name must be specified.').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        var errors = validationResult(req);
        var hero = new category({
            type: 'Hero',
            title: req.body.name,
            image: '/images/' + req.body.image
        });
        if (!errors.isEmpty()) {
            res.render('hero_form', { title: 'Create New Hero', errors: errors.array() });
            return;
        }
        else {
            category.findOne({ title: req.body.name }).
                exec(function(err, found_hero) {
                    if (err) { return next(err); }
                    if (found_hero) {
                        res.redirect(found_hero.hero_url);
                    }
                    else {
                        hero.save(function(err) {
                            if (err) { return next(err); }
                            res.redirect(hero.hero_url);
                        });
                    }
                });
        }
    }
];

exports.hero_delete_get = function(req, res, next) {
    category.findById({ _id: req.params.id }).
        exec(function(err, result) {
            if (err) { return next(err); }
            if (result == null) {
                res.redirect('/catalog/hero/');
            }
            else {
                res.render('hero_delete', { title: 'Delete Hero: ' + result.title });
            }
        });
};

exports.hero_delete_post = function(req, res) {
    category.findByIdAndDelete({ _id: req.params.id }).
        exec(function(err, results) {
            if ( err) { return next(err); }
            res.redirect('/catalog/skins');
        });
};

exports.hero_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: hero update GET');
};

exports.hero_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: hero update POST');
};
