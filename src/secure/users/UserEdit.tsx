import React, { Component } from "react";
import Wrapper from "../Wrapper";
import { RouteComponentProps } from "react-router-dom";

interface RouteInfo {
    id: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {
    // any other props (leave empty if none)
}

export default class UserEdit extends Component<ComponentProps> {
    id = "";
    componentDidMount = () => {
        this.id = this.props.match.params.id;
        console.log(this.id);
    };
    render() {
        return <Wrapper></Wrapper>;
    }
}
