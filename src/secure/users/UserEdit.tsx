import React, { Component } from "react";
import { Role } from "../../classes/role";
import Wrapper from "../Wrapper";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { User } from "../../classes/user";
interface RouteInfo {
    id: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {
    // any other props (leave empty if none)
}

export default class UserEdit extends Component<ComponentProps> {
    state = {
        roles: [],
        redirect: false,
        first_name: "",
        last_name: "",
        email: "",
        role_id: 0,
    };
    id = "";
    first_name = "";
    last_name = "";
    email = "";
    role_id = 0;

    componentDidMount = async () => {
        this.id = this.props.match.params.id;
        console.log(this.id);
        const rolesCall = await axios.get("/roles");
        const userCall = await axios.get(`/users/${this.id}`);

        const user: User = userCall.data.data;
        this.setState({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            roles: rolesCall.data.data,
            role_id: user.role.id,
        });
    };

    submit = async () => {};

    render() {
        return (
            <Wrapper>
                {" "}
                <form onSubmit={this.submit}>
                    <div className="form-row my-5">
                        <div className="form-group col-md-6">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                defaultValue={this.state.first_name}
                                onChange={(e) => (this.first_name = e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                defaultValue={this.state.last_name}
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
                                defaultValue={this.state.email}
                                onChange={(e) => (this.email = e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="role_id">Role</label>
                            <select
                                id="role_id"
                                className="form-control"
                                value={this.state.role_id}
                                onChange={(e) => {
                                    this.role_id = parseInt(e.target.value);
                                    this.setState({ role_id: e.target.value });
                                }}
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
