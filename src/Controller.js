import React, { Component } from "react";
import _ from "lodash";
import { Layout } from "antd";
import Navbar from "./Navbar";
import Lists from "./Lists";
import "antd/dist/antd.css";
const { Header, Content } = Layout;

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
            currentList: "default",
            currentDraft: "",
            lists: {
                default0: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: ""
                },
                default1: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: ""
                },
                default2: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: ""
                },
                default3: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: ""
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
                },
                default8: {
                    items: [
                        {
                            text: "First default item",
                            priority: "critical"
                        }
                    ],
                    note: ""
                },
                default9: {
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
            let oldList = this.getList(list);
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

    getList = (list = this.state.currentList) => {
        if (list.match(/^\s*$/)) return;
        if (this.state.lists.hasOwnProperty(list)) return this.state.lists[list];
        throw Error(`List doesn't exist: "${list}"`);
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

    render() {
        return (
            <>
                <Layout className="layout">
                    <Header>
                        <Navbar />
                    </Header>
                    <Content>
                        <Lists lists={this.state.lists} />
                    </Content>
                </Layout>
            </>
        );
    }
}

export default Controller;
