var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UtilitySchema = new Schema(
    {
        title: { type:String, required: true },
        utility_name: { type: String },
        image: { type: String },
        price: { type: Number, required: true }
    }
);

UtilitySchema.virtual('url').get(function() {
    return '/catalog/utility/' + this._id;
});

module.exports = mongoose.model('Utility', UtilitySchema);
