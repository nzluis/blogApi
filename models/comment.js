const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema ({
    email: {type: String, required: true},
    text: {type: String, required: true},
    timestamp: {type: Date, default: Date.now, required: true},
    
})

CommentSchema.virtual("timestamp_formatted").get(function(){
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED)
})

module.exports = mongoose.model('Comment', CommentSchema)