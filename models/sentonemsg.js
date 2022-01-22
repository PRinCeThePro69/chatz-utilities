const mongoose = require('mongoose')
const reqString = {
    type: String,
    required: true
};
const sentmsgSchema = mongoose.Schema({
    userId: reqString,
    sent: Boolean,
}, {
    timestamps: true
})
module.exports = mongoose.model('sent-one-msg', sentmsgSchema)
