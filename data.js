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
    ],
    cb);
}


function createHero1(cb) {
    async.parallel([
        function(callback) {
            heroCreate('Bladeform Legacy', '/public/images/Bladeform_Legacy.png', '1,979.71', 'Arcana', '5');
        },
        function(callback) {
            heroCreate('Lineage of the Stormlords', '/public/images/Lineage_of_the_Stormlords.png', 'Not Tradeable', 'Mythical', '0');
        },
        function(callback) {
            heroCreate('Gifts of the Vanished Isle Set', '/public/images/Cosmetic_icon_Gifts_of_the_Vanished_Isle_Set.png', '59.39', 'Rare', '1');
        }
    ],
    cb);
}


function createHero2(cb) {
    async.parallel([
        function(callback) {
            heroCreate('Fiery Soul of the Slayer', '/public/images/Fiery_Soul_of_the_Slayer.png', '1,539.77', 'Arcana', '1');
        },
        function(callback) {
            heroCreate('Light of the Solar Divine', '/public/images/Light_of_the_Solar_Divine.png', '2.20', 'Rare', '6');
        },
        function(callback) {
            heroCreate('Ember Crane Set', '/public/images/Ember_Crane_Set.png', '851.28', 'Mythical', '2');
        }
    ],
    cb);
}


function createHero3(cb) {
    async.parallel([
        function(callback) {
            heroCreate('The Magus Cypher', '/public/images/The_Magus_Cypher.png', '2,196.13', 'Arcana', '5');
        },
        function(callback) {
            heroCreate('Garb of the Cunning Augur', '/public/images/Garb_of_the_Cunning_Augur.png', 'Not Tradeable', 'Mythical', '0');
        },
        function(callback) {
            heroCreate('Avatar of the Impossible Realm', '/public/images/Avatar_of_the_Impossible_Realm.png', '1,654.46', 'Mythical', '1');
        }
    ],
    cb);
}


function createUtility1(cb) {
    async.parallel([
        function(callback) {
            utilityCreate('Curious Snaptrap', '92.90', '/public/images/Ward_Curious_Snaptrap.png');
        },
        function(callback) {
            utilityCreate('The Watcher Below', '6.58', '/public/images/Ward_The_Watcher_Below.png');
        },
        function(callback) {
            utilityCreate('Schnapp & Spyfly', '375.90', '/public/images/Ward_Schnapp_%26_Spyfly.png');
        }
    ],
    cb);
}


function createUtility2(cb) {
    async.parallel([
        function(callback) {
            utilityCreate('The Defense Season 2 War Dog', '20,729.64', '/public/images/Courier_The_Defense_Season_2_War_Dog.png');
        },
        function(callback) {
            utilityCreate('Hakobi and Tenneko', '3,301.60', '/public/images/CourierHakobi_and_Tenneko.png');
        },
        function(callback) {
            utilityCreate('Honey Heist Baby Roshan', '36,940.93', '/public/images/Courier_Honey_Heist_Baby_Roshan.png');
        }
    ],
    cb);
}


function createUtility3(cb) {
    async.parallel([
        function(callback) {
            utilityCreate('Heroic Effigy of Winter 2016 Level III', '327.66', '/public/images/Effigy_Heroic_Effigy_of_Winter_2016_Level_III.png');
        },
        function(callback) {
            utilityCreate('Heroic Effigy of The International 2016 III', '117.89', '/public/images/Effigy_Heroic_Effigy_of_The_International_2016_III.png');
        },
        function(callback) {
            utilityCreate('Heroic Effigy of The Fall 2016 Battle Pass Level III', '51.26', '/public/images/Effigy_Heroic_Effigy_of_The_Fall_2016_Battle_Pass_Level_III.png');
        }
    ],
    cb);
}


async.series([
    createCategory,
    createHero1,
    createHero2,
    createHero3,
    createUtility1,
    createUtility2,
    createUtility3
],
function(err, results) {
    if (err) {
        console.log('Final error' + err);
    } else {
        console.log('Success!');
    }
    mongoose.connection.close();
});