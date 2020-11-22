import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/user";

class Users extends Component {
    state = {
        users: [],
    };
    componentDidMount = async () => {
        const res = await axios.get("/users");
        // ! Have to check if the res.data is existed
        if (res.data) {
            this.setState({ users: res.data.data });
        }
        console.log(res);
    };
    render() {
        return (
            <Wrapper>
                <h2>Section title</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user: User) => {
                                return (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>
                                            {user.first_name} {user.last_name}
                                        </td>
                                        <td>{user.email}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        );
    }
}

export default Users;
