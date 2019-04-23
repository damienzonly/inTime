import React, { Component } from "react";
import _ from "lodash";
import { Layout } from "antd";
import Navbar from "./Navbar";
import Boards from "./Boards";
import Board from "./Board";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import ls from "local-storage";

const { Content, Sider } = Layout;
const SAVE_STATE_INTERVAL = 2000;
const LOCAL_STORAGE_KEY = "todo_app_state";
const AUTOSAVE = false;

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
            currentKeyCounter: 5,
            fontSize: 15,
            gridColumns: 2,
            boards: {
                "shopping list": {
                    items: [
                        {
                            text: "milk",
                            priority: "critical",
                            done: false,
                            created: new Date(),
                            key: 0
                        },
                        {
                            text: "Butter",
                            priority: "major",
                            done: false,
                            created: new Date(),
                            key: 1
                        },
                        {
                            text: "Oil",
                            priority: "minor",
                            done: false,
                            created: new Date(),
                            key: 2
                        },
                        {
                            text: "Outfit",
                            priority: "trivial",
                            done: true,
                            created: new Date(),
                            key: 3
                        }
                    ],
                    description: "Discounts @wallmart"
                },
                homeworks: {
                    items: [
                        {
                            text: "math exercises",
                            priority: "minor",
                            done: false,
                            created: new Date(),
                            key: 4
                        },
                        {
                            text: "literature reading",
                            priority: "major",
                            done: false,
                            created: new Date(),
                            key: 5
                        }
                    ],
                    created_date: new Date(),
                    description: "Boring, but i need to..."
                }
            }
        };
        if (ls(LOCAL_STORAGE_KEY)) this.state = ls(LOCAL_STORAGE_KEY);
        this.saveStateInterval = setInterval(() => {
            if (AUTOSAVE) {
                this.saveStateToLocalStorage();
            }
        }, SAVE_STATE_INTERVAL);
    }
    /**
     * Adds an item to the list with priority
     * @param {string} text Item text
     * @param {string} boardName list object where Item belongs to
     * @param {string} priority list object where Item belongs to
     */
    addItemToBoard = (text, boardName, priority = "critical") => {
        // disable invalid inputs
        if (typeof priority !== "string") priority = this.getPriorityByCode(priority);
        if (text.match(/^\s*$/)) return;
        if (typeof text === "string") {
            let oldBoard = this.getBoardClone(boardName);
            this.setState(state => {
                oldBoard.items = [
                    { text, priority, done: false, created: new Date(), key: state.currentKeyCounter + 1 },
                    ...oldBoard.items
                ];
                return {
                    currentKeyCounter: state.currentKeyCounter + 1,
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

    /**
     * Removes the item with given key from boardName
     * @param {number} key
     * @param {string} boardName
     */
    destroyItemFromBoard = async (key, boardName) => {
        let boardClone = this.getBoardClone(boardName);
        let keys = boardClone.items.map(item => item.key);
        let itemKey = keys.indexOf(key);
        if (itemKey !== -1) {
            boardClone.items = boardClone.items.filter(item => item.key !== key);
            this.setState(state => {
                return {
                    boards: {
                        ...state.boards,
                        [boardName]: boardClone
                    }
                };
            });
            return;
        } else {
            throw Error(`Item not found for key: ${key}`);
        }
    };

    toggleDoneOnItem = (key, boardName) => {
        let nextBoard = this.getBoardClone(boardName);
        let itemKeys = nextBoard.items.map(item => item.key);
        let position = itemKeys.indexOf(key);
        if (position >= 0) {
            nextBoard.items[position].done = !nextBoard.items[position].done;
            this.setState(state => {
                return {
                    boards: {
                        ...state.boards,
                        [boardName]: nextBoard
                    }
                };
            });
        } else throw Error("Key not found while trying to toggle item");
    };

    saveStateToLocalStorage = () => {
        ls.set(LOCAL_STORAGE_KEY, this.state);
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
                                                boardName={props.match.params.boardName}
                                                board={this.getBoardClone(props.match.params.boardName)}
                                                addItemToBoard={this.addItemToBoard}
                                                toggleDoneOnItem={this.toggleDoneOnItem}
                                                fontSize={this.state.fontSize}
                                                changeFontSize={this.changeFontSize}
                                                destroyItemFromBoard={this.destroyItemFromBoard}
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
