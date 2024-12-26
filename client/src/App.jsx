import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";

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
        </Router>
    );
};

export default App;
