const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blog_title: { type: String, required: true },
    blog_content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: { 
        type: String,
        validate: {
            validator: function(v) {
                // Validate that the string is a URL
                return /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        },
        required: false // Optional field
    }
});

module.exports = mongoose.model('Blog', blogSchema);
