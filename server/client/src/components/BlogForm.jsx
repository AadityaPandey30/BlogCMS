import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BlogForm = () => {
    const { id } = useParams(); // For edit
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        blog_title: "",
        blog_content: "",
        blog_image: null, // To handle image upload
    });

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    const response = await axios.get(`https://admin-fluencer-blogs-b6ewhacwgdeyh8fw.eastasia-01.azurewebsites.net/api/blogs/${id}`);
                    setFormData({
                        blog_title: response.data.blog_title,
                        blog_content: response.data.blog_content,
                        blog_image: null, // Image will not be fetched here
                    });
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
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, blog_image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append("blog_title", formData.blog_title);
        formDataToSend.append("blog_content", formData.blog_content);
    
        if (formData.blog_image) {
            formDataToSend.append("image", formData.blog_image); // Match backend field
        }

        if (!formData.blog_title || !formData.blog_content) {
            alert("Please fill in all required fields.");
            return;
        }
        
    
        try {
            if (id) {
                await axios.patch(`https://admin-fluencer-blogs-b6ewhacwgdeyh8fw.eastasia-01.azurewebsites.net/api/blogs/${id}`, formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("Blog updated successfully");
            } else {
                await axios.post("https://admin-fluencer-blogs-b6ewhacwgdeyh8fw.eastasia-01.azurewebsites.net/api/blogs", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("New blog created successfully");
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4"
                />
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
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
