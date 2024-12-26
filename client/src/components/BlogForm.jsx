import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const BlogForm = () => {
    const { id } = useParams(); // Use for edit
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    const [formData, setFormData] = useState({
        blog_title: "",
        blog_content: "",
    });

console.log("Form data:", formData);
console.log("Blog ID:", id);

    // Fetch the blog if editing
    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                    setFormData(response.data);
                } catch (error) {
                    console.error("Error fetching blog:", error);
                }
            };
            fetchBlog();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log("Updated formData:", { ...formData, [name]: value }); // Debugging
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data being sent:", formData);
        console.log("Blog ID:", id);
    
        try {
            if (id) {
                const response = await axios.patch(`http://localhost:5000/api/blogs/${id}`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("Blog updated successfully:", response.data);
            } else {
                const newBlog = { ...formData, blog_no: Date.now() };
                const response = await axios.post("http://localhost:5000/api/blogs", newBlog);
                console.log("New blog created successfully:", response.data);
            }
            navigate("/");
        } catch (error) {
            console.error("Error saving blog:", error.response?.data || error.message);
        }
    };
    
    
    
    

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{id ? "Update Blog" : "Add Blog"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="blog_title"
                    type="text"
                    placeholder="Blog Title"
                    value={formData.blog_title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg mb-4"
                />
                <textarea
                    name="blog_content"
                    placeholder="Blog Content"
                    value={formData.blog_content}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg mb-4"
                ></textarea>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        onClick={() => navigate("/")} // Use navigate for redirection
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

// Define propTypes
BlogForm.propTypes = {
    blog: PropTypes.shape({
        blog_title: PropTypes.string,
        blog_content: PropTypes.string,
    }),
};

export default BlogForm;
