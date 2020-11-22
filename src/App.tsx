import React from "react";
// import logo from "./logo.svg";
import "./App.css";

import Dashboard from "./secure/dashboard/Dashboard";
import Users from "./secure/users/Users";
import Login from "./public/Login";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./public/Register";
import RedirectToDashBoard from "./secure/RedirectToDashBoard";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path={"/"} exact component={RedirectToDashBoard} />
                <Route path={"/dashboard"} exact component={Dashboard} />
                <Route path={"/users"} component={Users} />
                <Route path={"/login"} component={Login} />
                <Route path={"/register"} component={Register} />
            </BrowserRouter>
        </div>
    );
}

export default App;
