import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render = () => (
        <>
            <Menu theme="dark" mode="vertical">
                <Menu.Item key="1">
                    <span> Boards</span>
                    <Link to="/" />
                </Menu.Item>
            </Menu>
        </>
    );
}
