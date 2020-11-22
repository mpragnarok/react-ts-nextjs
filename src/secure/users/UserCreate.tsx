import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";

import { Role } from "../../classes/role";
import axios from "axios";
import { Redirect } from "react-router-dom";
class UserCreate extends Component {
    state = {
        roles: [],
        redirect: false,
    };
    first_name = "";
    last_name = "";
    email = "";
    role_id = 0;

    componentDidMount = async () => {
        const res = await axios.get("/roles");
        if (res.data) {
            this.setState({ roles: res.data.data });
        }
    };
    submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post("/users", {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role_id: this.role_id,
        });
        this.setState({ redirect: true });
    };
    render() {
        if (this.state.redirect) {
            return <Redirect to={"/users"} />;
        }
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <div className="form-row my-5">
                        <div className="form-group col-md-6">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                onChange={(e) => (this.first_name = e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                onChange={(e) => (this.last_name = e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                onChange={(e) => (this.email = e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="role_id">Role</label>
                            <select
                                id="role_id"
                                className="form-control"
                                onChange={(e) => (this.role_id = parseInt(e.target.value))}
                            >
                                <option selected>Select Role</option>
                                {this.state.roles.map((role: Role) => {
                                    return (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
            </Wrapper>
        );
    }
}

export default UserCreate;
