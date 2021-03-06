import React, { Component } from "react";
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Wrapper extends Component {
    state = {
        redirect: false,
    };
    componentDidMount = async () => {
        try {
            const res = await axios.get("/user");
            console.log(res);
        } catch (err) {
            this.setState({ redirect: true });
        }
    };
    render() {
        if (this.state.redirect) {
            return <Redirect to={"/login"} />;
        }
        return (
            <>
                <Nav />
                <div className="container-fluid">
                    <div className="row">
                        <Menu />

                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </>
        );
    }
}
