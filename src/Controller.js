import React, { Component } from "react";
import _ from "lodash";
import { Layout } from "antd";
import Navbar from "./Navbar";
import Lists from "./Lists";
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
            gridColumns: 3,
            currentBoard: "default0",
            currentDraft: "",
            boards: {
                default0: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: "nota 0"
                },
                default1: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: "nota 1"
                },
                default2: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: "nota 2"
                },
                default3: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: "nota 3"
                },
                default4: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: ""
                },
                default5: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: ""
                },
                default6: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: ""
                },
                default7: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: ""
                }
            }
        };
    }
    /**
     * Adds an item to the list with priority
     * @param {string} text Item text
     * @param {string} list list object where Item belongs to
     */
    addItemToList = (text, list, priority = "critical") => {
        // disable invalid inputs
        if (typeof priority !== "string") priority = this.getPriorityByCode(priority);
        if (typeof text === "string") {
            let oldList = this.getBoard(list);
            this.setState(state => {
                return {
                    lists: {
                        ...state.lists,
                        [list]: {
                            items: [...oldList.items, { text, priority }]
                        }
                    }
                };
            });
        } else {
            throw Error(`Invalid item ${JSON.stringify(text, null, 4)}`);
        }
    };

    getBoard = (boardName = this.state.currentBoard) => {
        if (boardName.match(/^\s*$/)) return;
        if (this.state.boards.hasOwnProperty(boardName)) return this.state.boards[boardName];
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

    render() {
        // create a route "/board/:boardName" for every board
        let routes = Object.keys(this.state.boards).map((board, index) => (
            <Route
                key={index}
                path={`/board/${board}`}
                component={props => <Board {...props} title={board} board={this.getBoard(board)} />}
            />
        ));
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
                            <Navbar lists={this.state.boards} />
                        </Sider>
                        <Layout>
                            <Content>
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={() => (
                                            <Lists onColSliderChange={this.onColSliderChange} columns={this.state.gridColumns} lists={this.state.boards} COLS_NUMBER={this.state.gridColumns} />
                                        )}
                                    />
                                    {routes}
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
