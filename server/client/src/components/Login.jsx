import { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "fluencer@gmail.com" && password === "Fluencer2023") {
            onLogin(); // Update the authenticated state in the parent component
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="items-center justify-center w-fit m-[8%]">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={handleLogin} className="w-80 flex flex-col">
                <label className="mb-2">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-4"
                    required
                />
                <label className="mb-2">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-4"
                    required
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white py-2">
                    Login
                </button>
            </form>
        </div>
    );
};

// Add propTypes validation
Login.propTypes = {
    onLogin: PropTypes.func.isRequired, // Ensure onLogin is provided and is a function
};

export default Login;
