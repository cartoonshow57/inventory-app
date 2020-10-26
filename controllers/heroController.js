const { nextTick } = require('async');
const category = require('../models/category');
var Hero = require('../models/heroes');


exports.hero_list = function(req, res) {
    category.find({}, 'title image')
        .exec(function(err, list_hero) {
            if (err) { return next(err); }
            res.render('hero_list', { title: 'Hero List', hero_list: list_hero.slice(2, 5) });
        });
};

exports.hero_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: hero list');
};

exports.hero_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: hero create GET');
};

exports.hero_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: hero create POST');
};

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
