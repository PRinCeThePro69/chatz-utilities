const mongoose = require('mongoose')
const reqString = {
    type: String,
    required: true
};
const automodSchema = mongoose.Schema({
    _id: reqString,
    userId: reqString,
    reason: reqString,
    timestamp: reqString,
    expires: {
        type: Date,
        required: true
    },

}, {
    timestamps: true
})
module.exports = mongoose.model('automod-warns-chatchill', automodSchema)
