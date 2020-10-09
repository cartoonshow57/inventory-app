var express = require('express');

var router = express.Router();


var category_controller = require('../controllers/categoryController');
var hero_controller = require('../controllers/heroController');
var utility_controller = require('../controllers/utilityController');


router.get('/', category_controller.category_list);


// Category Routes

router.get('/skins', hero_controller.hero_list);

router.get('/utility', utility_controller.utility_list);


// Hero Routes

router.get('/hero/:id', hero_controller.hero_detail);

router.get('/hero/create', hero_controller.hero_create_get);

router.post('/hero/create', hero_controller.hero_create_post);

router.get('/hero/:id/delete', hero_controller.hero_delete_get);

router.post('/hero/:id/delete', hero_controller.hero_delete_post);

router.get('/hero/:id/update', hero_controller.hero_update_get);

router.post('/hero:id/update', hero_controller.hero_update_post);


// Utility Routes

router.get('/utility/:id', utility_controller.utility_detail);

router.get('/utility/create', utility_controller.utility_create_get);

router.post('/utility/create', utility_controller.utility_create_post);

router.get('/utility/:id/delete', utility_controller.utility_delete_get);

router.post('/utility/:id/delete', utility_controller.utility_delete_post);

router.get('/utility/:id/update', utility_controller.utility_update_get);

router.post('/utility/:id/update', utility_controller.utility_update_post);


module.exports = router;