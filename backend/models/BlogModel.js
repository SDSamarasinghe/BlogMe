const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    topic:String,
    description:String,
    img:String,

});

const Blog = mongoose.model("BlogModel",BlogSchema);

model.exports =  Blog;