import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<BlogList />} />
                    <Route path="blog/new" element={<BlogForm />} />
                    <Route path="blog/edit/:id" element={<BlogForm />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
