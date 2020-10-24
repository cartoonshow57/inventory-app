var Category = require('../models/category.js');


exports.category_list = function(req, res) {
    res.render('index', { title: 'Inventory-App' });
};
