import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/style.css"
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/Authcontext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);

