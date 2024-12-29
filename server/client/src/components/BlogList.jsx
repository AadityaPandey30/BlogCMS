import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    // Fetch Blogs
    const fetchBlogs = async () => {
        try {
            const response = await axios.get("https://admin-fluencer-blogs-b6ewhacwgdeyh8fw.southeastasia-01.azurewebsites.net/api/blogs");
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://admin-fluencer-blogs-b6ewhacwgdeyh8fw.southeastasia-01.azurewebsites.net/api/blogs/${id}`);
            console.log(response.data.message);
            fetchBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };
    

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="p-4 w-fit m-auto">
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>
            <div className="mb-4">
                <Link
                    to="/blog/new"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Add New Blog
                </Link>
            </div>
            <div className="grid gap-4">
            {blogs.map((blog) => (
    <div
        key={blog._id}
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-2xl"
    >
        {blog.image && (
            <img
                src={`https://admin-fluencer-blogs-b6ewhacwgdeyh8fw.southeastasia-01.azurewebsites.net/${blog.image}`}
                alt={blog.blog_title}
                className="w-full h-auto mb-4 rounded-lg"
            />
        )}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {blog.blog_title}
        </h3>
        <p className="text-gray-600 mb-4">{blog.blog_content.slice(0,300)}...</p>
        <small className="text-gray-500 text-sm">
            {new Date(blog.date).toLocaleDateString()}
        </small>
        <div className="mt-4 flex gap-4">
            <Link
                to={`/blog/edit/${blog._id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Update
            </Link>
            <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => handleDelete(blog._id)}
            >
                Delete
            </button>
        </div>
    </div>
))}
            </div>
        </div>
    );
};

export default BlogList;
