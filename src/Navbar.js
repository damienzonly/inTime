import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }
    toggleCollapsed = () => {
        this.setState(state => {
            return {
                collapsed: !state.collapsed
            };
        });
    };
    render = () => {
        let boardsMenu = Object.keys(this.props.boards).map((item, index) => {
            let url = `/board/${item}`;
            return (
                <Menu.Item key={"list-" + index}>
                    {item}
                    <Link to={url} />
                </Menu.Item>
            );
        });
        let subMenu;
        if (boardsMenu) {
            subMenu = (
                <SubMenu key="2" title="Your boards">
                    {boardsMenu}
                </SubMenu>
            );
        }
        return (
            <>
                <Menu theme="dark" style={{ minHeight: "100vh" }} mode="inline">
                    <Menu.Item key="1">
                        <span> Boards</span>
                        <Link to="/" />
                    </Menu.Item>
                    {subMenu}
                </Menu>
            </>
        );
    };
}
