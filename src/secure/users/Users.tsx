import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/user";
import { Link } from "react-router-dom";

class Users extends Component {
    state = {
        users: [],
    };

    page = 1;
    last_page = 0;

    componentDidMount = async () => {
        const res = await axios.get(`/users?page=${this.page}`);
        // ! Have to check if the res.data is existed
        if (res.data) {
            this.setState({ users: res.data.data });
            this.last_page = res.data.meta.last_page;
        }
    };

    next = async () => {
        if (this.page === this.last_page) {
            return;
        }
        this.page++;

        await this.componentDidMount();
    };

    prev = async () => {
        if (this.page === 1) return;

        this.page--;
        await this.componentDidMount();
    };

    delete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            await axios.delete(`/users/${id}`);
            this.setState({ users: this.state.users.filter((u: User) => u.id !== id) });
        }
    };
    render() {
        return (
            <Wrapper>
                <h2>Section title</h2>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={"/users/create"} className="btn btn-sm btn-outline-secondary  mb-3">
                        Add
                    </Link>
                </div>
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
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            {user.first_name} {user.last_name}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <button className="btn btn-sm btn-outline-secondary">Edit</button>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => this.delete(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" onClick={this.prev}>
                                Previous
                            </button>
                        </li>
                        <li className="page-item">
                            <button className="page-link" onClick={this.next}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </Wrapper>
        );
    }
}

export default Users;
