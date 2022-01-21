const mongoose = require('mongoose')


const reqString = {
    type: String,
    required: true
};


const punishmentSchema = mongoose.Schema({
    _id: reqString,
    userId: reqString,
    staffId: reqString,
    type: reqString,
    reason: reqString,
    timestamp: reqString,
    expires: {
        type: Date,
        required: false
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('punishment-chatchill', punishmentSchema)