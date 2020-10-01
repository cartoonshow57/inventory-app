var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HeroesSchema = new Schema(
    {
        title: { type: String, required: true },
        image: { type: Schema.Types.ObjectId, ref: 'image' },
        rarity: { type: String, required: true, enum: ['Common', 'Uncommon', 'Rare', 'Mythical', 'Legendary', 'Immortal', 'Arcana'] },
        price: { type: Number, required: true },
        stock: { type: Number}
    }
);

HeroesSchema.virtual('url').get(function() {
    return '/catalog/heroes/' + this._id;
});

module.exports = mongoose.model('Hero', HeroesSchema);
