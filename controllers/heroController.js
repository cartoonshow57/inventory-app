const async = require('async');
const category = require('../models/category');
var Hero = require('../models/heroes');
const { body, validationResult } = require('express-validator');


exports.hero_list = function(req, res) {
    category.find({ type: 'Hero'})
        .exec(function(err, list_hero) {
            console.log(list_hero);
            if (err) { return next(err); }
            console.log(list_hero);
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
                        res.render('hero_detail', { title: skins[0].title + ' Skins', skins_list: skins });
                    }
                    else {
                        res.render('hero_detail', { title: results.title + ' Skins' });
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
                        console.log('Redirected');
                        res.redirect(found_hero.hero_url);
                    }
                    else {
                        hero.save(function(err) {
                            if (err) { return next(err); }
                            console.log('Hero created successfully');
                            res.redirect(hero.hero_url);
                        });
                    }
                });
        }
    }
];

exports.hero_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: hero delete GET');
};

exports.hero_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: hero delete POST');
};

exports.hero_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: hero update GET');
};

exports.hero_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: hero update POST');
};
