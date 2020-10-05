var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        title: { type: String, required: true },
        image: { type: String }
    }
);

CategorySchema.virtual('url').get(function() {
    return '/catalog/category/' + this._id;
});

module.exports = mongoose.model('Category', CategorySchema);