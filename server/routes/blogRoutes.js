const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save images in the uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({ storage, fileFilter });

// Route to add a new blog with image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { blog_title, blog_content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!blog_title || !blog_content) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const blog = new Blog({ blog_title, blog_content, image });
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

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
router.patch('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { blog_title, blog_content } = req.body;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update fields if provided
        if (blog_title) blog.blog_title = blog_title;
        if (blog_content) blog.blog_content = blog_content;
        if (req.file) {
            blog.image = `/uploads/${req.file.filename}`;
        }

        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});





module.exports = router;
