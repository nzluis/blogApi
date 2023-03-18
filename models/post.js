const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { DateTime } = require("luxon");

const PostSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    status: {type: String, enum: ['Show', 'Hide'],default: 'Hide', required: true}, 
    timestamp: {type: Date, default: Date.now, required: true},
})

PostSchema.virtual('url').get(function(){
    return `/post/${this._id}`
})

PostSchema.virtual("timestamp_formatted").get(function(){
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED)
})

module.exports = mongoose.model('Post', PostSchema)