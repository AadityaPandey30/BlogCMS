import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useState } from "react";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                {!isAuthenticated ? (
                    <Route path="/" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                ) : (
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<BlogList />} />
                        <Route path="blog/new" element={<BlogForm />} />
                        <Route path="blog/edit/:id" element={<BlogForm />} />
                    </Route>
                )}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
