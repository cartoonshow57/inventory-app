var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        image: { type: String },
        skins: [{type: Schema.Types.ObjectId, ref: ['Hero', 'Utility']}]
    }
);

CategorySchema.virtual('hero_url').get(function() {
    return '/catalog/hero/' + this._id;
});

CategorySchema.virtual('utility_url').get(function() {
    return '/catalog/utility/' + this._id;
});

module.exports = mongoose.model('Category', CategorySchema);