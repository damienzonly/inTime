import React, { Component } from "react";
import _ from "lodash";
import { Layout } from "antd";
import Navbar from "./Navbar";
import Boards from "./Boards";
import Board from "./Board";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
const { Content, Sider } = Layout;

class Controller extends Component {
    constructor(props) {
        super(props);
        this.priorities = {
            critical: 0,
            major: 1,
            minor: 2,
            trivial: 3
        };
        this.state = {
            fontSize: 15,
            gridColumns: 3,
            boards: {
                default0: {
                    items: [
                        {
                            text: "Text 1",
                            priority: "critical",
                            done: false,
                            created: new Date()
                        },
                        {
                            text: "Long text 2",
                            priority: "major",
                            done: false,
                            created: new Date()
                        },
                        {
                            text: "First default item ".repeat(10),
                            priority: "minor",
                            done: false,
                            created: new Date()
                        },
                        {
                            text: "First default item",
                            priority: "trivial",
                            done: true,
                            created: new Date()
                        }
                    ],
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                },
                default1: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical",
                            done: true,
                            created: new Date()
                        }
                    ],
                    created_date: new Date(),
                    description: "nota 1"
                },
                default2: {
                    items: [],
                    created_date: new Date(),
                    description: "nota 2"
                },
                default3: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical",
                            done: false
                        }
                    ],
                    created_date: new Date(),
                    description: "nota 3"
                }
            }
        };
    }
    /**
     * Adds an item to the list with priority
     * @param {string} text Item text
     * @param {string} boardName list object where Item belongs to
     */
    addItemToBoard = (text, boardName, priority = "critical") => {
        // disable invalid inputs
        if (typeof priority !== "string") priority = this.getPriorityByCode(priority);
        if (text.match(/^\s*$/)) return;
        if (typeof text === "string") {
            let oldBoard = this.getBoardClone(boardName);
            oldBoard.items = [{ text, priority, done: false }, ...oldBoard.items];
            this.setState(state => {
                return {
                    boards: {
                        ...state.boards,
                        [boardName]: oldBoard
                    }
                };
            });
        } else {
            throw Error(`Invalid item ${JSON.stringify(text, null, 4)}`);
        }
    };

    getBoardClone = (boardName = this.state.currentBoard) => {
        if (boardName.match(/^\s*$/)) return;
        if (this.state.boards.hasOwnProperty(boardName)) return _.cloneDeep(this.state.boards[boardName]);
        throw Error(`List doesn't exist: "${boardName}"`);
    };

    getPrioritybyName = name => {
        if (typeof name !== "string") return;
        if (this.priorities.hasOwnProperty(name)) return this.priorities[name];
        throw Error(`Priority with name "${name}" not found`);
    };

    getPriorityByCode = value => {
        if (typeof value !== "number") return;
        let inverted = _.invert(this.priorities);
        if (inverted.hasOwnProperty(value)) return inverted[value];
        throw Error(`Priority with value "${value}" not found`);
    };

    onColSliderChange = newVal => {
        this.setState({ gridColumns: newVal });
    };
    changeFontSize = val => {
        this.setState({ fontSize: val });
    };

    render() {
        return (
            <>
                <Router>
                    <Layout>
                        <Sider
                            width="20vw"
                            collapsible
                            collapsed={this.state.isSidebarCollapsed}
                            onCollapse={() => {
                                this.setState(state => {
                                    return {
                                        isSidebarCollapsed: !state.isSidebarCollapsed
                                    };
                                });
                            }}
                        >
                            <Navbar boards={this.state.boards} />
                        </Sider>
                        <Layout>
                            <Content>
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={() => (
                                            <Boards
                                                onColSliderChange={this.onColSliderChange}
                                                columns={this.state.gridColumns}
                                                boards={this.state.boards}
                                                getBoardClone={this.getBoardClone}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/board/:boardName"
                                        render={props => (
                                            <Board
                                                {...props}
                                                title={props.match.params.boardName}
                                                board={this.getBoardClone(props.match.params.boardName)}
                                                addItemToBoard={this.addItemToBoard}
                                                fontSize={this.state.fontSize}
                                                changeFontSize={this.changeFontSize}
                                            />
                                        )}
                                    />
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Router>
            </>
        );
    }
}

export default Controller;
