import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/login";
import Home from "./components/Home";
import PasswordUpdate from "./components/PasswordUpdate";

function PrivateRoute({ isAuthenticated, children }) {
    console.log("PrivateRoute isAuthenticated:", isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login/" replace />;
}

function Urls(props) {
    const [authChecked, setAuthChecked] = useState(false);

    // Simulating an async auth check (Replace with real auth logic if needed)
    useEffect(() => {
        setTimeout(() => {
            setAuthChecked(true);
        }, 100);  // Simulating delay before auth state is finalized
    }, []);

    console.log("Urls isAuthenticated:", props.isAuthenticated, "AuthChecked:", authChecked);

    // Show a loading state until authentication is checked
    if (!authChecked) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login/" element={<Login {...props} />} />
                <Route path="/" element={<PrivateRoute isAuthenticated={props.isAuthenticated}><Home {...props} /></PrivateRoute>} />
                <Route path="/update_password/" element={<PrivateRoute isAuthenticated={props.isAuthenticated}><PasswordUpdate {...props} /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Urls;
