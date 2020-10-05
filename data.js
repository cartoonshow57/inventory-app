var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return;
}

var async = require('async');
var category = require('./models/category');
var heroes = require('./models/heroes');
var utility = require('./models/utility');

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://Cartoon:helloworld123@cluster0.zfch2.mongodb.net/inventory-app?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

var categories = [];
var heroes = [];
var utilities = [];


function categoryCreate(title, image, cb) {
    name = {
        title: title,
    };
    if (image != false) name.image = image;
    var category = new Category(name);
    category.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}


function heroCreate(title, image, price, rarity, stock, cb) {
    herodetail = {
        title: title,
        price: price,
        rarity: rarity,
        stock: stock
    };
    if (image != false) herodetail.image = image;
    var hero = new hero(herodetail);
    hero.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Hero: ' + hero);
        heroes.push(hero);
        cb(null, hero);
    });
}


function utilityCreate(title, image, price, cb) {
    utilitydetail = {
        title: title,
        price: price
    };
    if (image != false) utilitydetail.image = image;
    var utility = new utility(utilitydetail);
    utility.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Utility: ' + utility);
        utilities.push(utility);
        cb(null, utility);
    });
}


function createCategory(cb) {
    async.series([
        function(callback) {
            categoryCreate('Skins', '/public/images/skins_icon.jpg');
        },
        function(callback) {
            categoryCreate('Utility', '/public/images/utility_icon.jpg');
        },
        function(callback) {
            categoryCreate('Juggernaut', '/public/images/Juggernaut_icon.png');
        },
        function(callback) {
            categoryCreate('Lina', '/public/images/Lina_icon.png');
        },
        function(callback) {
            categoryCreate('Rubick', '/public/images/Rubick_icon.png');
        },
        function(callback) {
            categoryCreate('Wards', '/public/images/wards_icon.jpg');
        },
        function(callback) {
            categoryCreate('Courier', '/public/images/courier_icon.png');
        },
        function(callback) {
            categoryCreate('Effigy', '/public/images/effigy_icon.jpg');
        }
    ]);
}


function createHero1(cb) {
    async.parallel([
        function(callback) {
            heroCreate('Bladeform Legacy', '/public/images/Bladeform_Legacy.png', '1979.71', 'Arcana', '5');
        },
        function(callback) {
            heroCreate('Lineage of the Stormlords', '/public/images/Lineage_of_the_Stormlords.png', 'Not Tradeable', 'Mythical', '0');
        },
        function(callback) {
            heroCreate('Gifts of the Vanished Isle Set', '/public/images/Cosmetic_icon_Gifts_of_the_Vanished_Isle_Set.png', '59.39', 'Rare', '1');
        }
    ]);
}


function createHero2(cb) {
    async.parallel([
        function(callback) {
            heroCreate('Fiery Soul of the Slayer', '/public/images/Fiery_Soul_of_the_Slayer.png', '1539.77', 'Arcana', '1');
        },
        function(callback) {
            heroCreate('Light of the Solar Divine', '/public/images/Light_of_the_Solar_Divine.png', '2.20', 'Rare', '6');
        },
        function(callback) {
            heroCreate('Ember Crane Set', '/public/images/Ember_Crane_Set.png', '851.28', 'Mythical', '2');
        }
    ]);
}


function createHero3(cb) {
    async.parallel([
        function(callback) {
            heroCreate('The Magus Cypher', '/public/images/The_Magus_Cypher.png', '2196.13', 'Arcana', '5');
        },
        function(callback) {
            heroCreate('Garb of the Cunning Augur', '/public/images/Garb_of_the_Cunning_Augur.png', 'Not Tradeable', 'Mythical', '0');
        },
        function(callback) {
            heroCreate('Avatar of the Impossible Realm', '/public/images/Avatar_of_the_Impossible_Realm.png', '1654.46', 'Mythical', '1');
        }
    ]);
}