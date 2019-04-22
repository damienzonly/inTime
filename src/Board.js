import React, { Component } from "react";
// import { Layout } from "antd";
export default class Board extends Component {
    constructor(props) {
        super(props);
        this.title = this.props.title;
    }
    render() {
        return (
            <>
                <h3 className="text-dark">{this.title}</h3>
                <h2 className="text-dark">{this.props.board.note}</h2>
            </>
        );
    }
}
