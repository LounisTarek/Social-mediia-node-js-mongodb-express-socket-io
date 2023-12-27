const Post = require("../models/Post");
const Comment = require("../models/Comment");

const createPost = async(req, res) => {
    try {
        
        const newPost = new Post({
            userId: req.user.id,
            description: req.body.description
        });

        const post = await newPost.save();
        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
};

const getPost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if(post){

            return res.status(200).json(post);

        }else{
            return res.status(404).json("No post found")
        }
        
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
};

const getUserPosts = async (req, res) => {
    try {
        const post = await Post.find({userId:req.params.id});

        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json("Internal server error");
    }
}

const deletePost = async (req,res) => {

    const postId = req.params.id;
    const post = await Post.findById(postId);

    try {

        if (!post) {
            return res.status(404).json("Post not found");
        }

        if (req.user.id === post.userId.toString() || req.user.isAdmin) {

                await post.deleteOne({_id: postId});
                await Comment.deleteMany({postId: postId});
                return res.status(200).json(" your post deleted succefully");

        } else {
            return res.status(401).json("You can only delete your posts");
        }
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json("Internal server error");
    }

};

const editPost = async (req, res) => {

    const post = await Post.findById(req.params.id);

    if(req.user.id === post.userId.toString() || req.body.isAdmin){
        
        try {

                if(req.body.description){
                    const post = await Post.findByIdAndUpdate(req.params.id, { $set: { description: req.body.description } });

                    return res.status(200).json("Post has been updated");
                }else{
                    return res.status(403).json("you can update only the description");
                }

        
        } catch (error) {
            res.status(500).json("Internal Server Error");
        }


    }else{
        return res.status(403).json("you can update only your posts");
    }
};

const createComment = async (req, res) => {
    try {
        const newComment = new Comment({
            userId: req.user.id,
            postId: req.params.id,
            description: req.body.description
        });

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = await newComment.save();

        post.comments.push(comment._id);

        await post.save();

        return res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
};

const getComments = async (req, res) => {
    try {

        const comments = await Comment.find({postId:req.params.id});
        return res.status(200).json(comments);
        
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

const deleteComment = async (req,res) => {

    const comment = await Comment.findById(req.params.id);

    if(!comment){
        return res.status(400).json("Comment not found");
    }

    if(req.user.id === comment.userId.toString() || req.user.isAdmin){

        try {

            await Comment.deleteOne({_id: req.params.id});
            return res.status(200).json("Comment has been deleted");

        } catch (error) {
            return res.status(500).json("Internal server error");
        }

    }else{
        return res.status(401).json("you can only delete your comment");
    }

};

const likePost = async (req, res) => {

    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json("Post not Found");
    }
        
        try {
            if(!post.likes.includes(req.user.id)){
                await post.updateOne({$push: { likes: req.user.id }});
                return res.status(200).json("like done");
            }else{
                return res.status(401).json("you can't put like twice");
            }
        
        } catch (error) {
            res.status(500).json("Internal Server Error");
        }

};

const likeComment = async (req, res) => {

    const comment = await Comment.findById(req.params.id);

    if(!comment){
        return res.status(404).json("Post not Found");
    }
        
        try {
            if(!comment.likes.includes(req.user.id)){
                await comment.updateOne({$push: { likes: req.user.id }});
                return res.status(200).json("like done");
            }else{
                return res.status(401).json("you can't put like twice");
            }
        
        } catch (error) {
            res.status(500).json("Internal Server Error");
        }
}


module.exports = { createPost, getPost, deletePost, editPost, getUserPosts, createComment, getComments, deleteComment, likePost, likeComment };