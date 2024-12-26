const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Example route to get a single blog by its ID
router.get("/:id", async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    try {
        const blog = await Blog.findById(id); // Fetch the blog from MongoDB using the ID
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog); // Return the blog as JSON
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// Add a new blog
router.post('/', async (req, res) => {
    try {
        console.log(req.body); // Log the body for debugging

        const { blog_title, blog_content } = req.body;

        if (!blog_title || !blog_content) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const blog = new Blog({blog_title, blog_content });
        const newBlog = await blog.save();

        res.status(201).json(newBlog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE blog by _id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Assuming you're using a MongoDB model for blogs
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Server error" });
    }
});



// PATCH (Partially update) blog by _id
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { blog_title, blog_content } = req.body; // You can receive only the fields you want to update
    try {
        // Update only the fields that were provided
        const updatedBlog = await Blog.findOneAndUpdate(
            { _id: id },
            { blog_title, blog_content }, // You can update other fields as necessary
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});




module.exports = router;
