const mongoose = require("mongoose");
const Comment = require("./Comment");

const PostSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId,
              ref:'User'}],

    comments: [{type: mongoose.Schema.Types.ObjectId,
                ref:'Comment'
    }]

},
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);