const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// Route to add a new blog
router.post('/', async (req, res) => {
    try {
        const { blog_title, blog_content, blog_image_url } = req.body;

        if (!blog_title || !blog_content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }

        const blog = new Blog({
            blog_title,
            blog_content,
            image: blog_image_url || null, // Save image URL if provided
        });

        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get a single blog by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (err) {
        console.error("Error fetching blog:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to delete a blog by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        console.error("Error deleting blog:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update an existing blog
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { blog_title, blog_content, blog_image_url } = req.body;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        // Update fields if provided
        if (blog_title) blog.blog_title = blog_title;
        if (blog_content) blog.blog_content = blog_content;
        if (blog_image_url) blog.image = blog_image_url;

        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
