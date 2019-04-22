import React, { Component } from "react";
import { Row, Col, Input, Breadcrumb, Slider, Select, Table, Tag } from "antd";

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDraft: "",
            currentPriority: "critical"
        };
    }
    changePriority = p => {
        this.setState({ currentPriority: p });
    };
    render() {
        let spacing = {
            span: 12,
            offset: 6
        };
        return (
            <>
                <Row>
                    <Col {...spacing} style={{ marginTop: 30 }}>
                        <h3>Font size</h3>
                        <Slider
                            min={15}
                            max={50}
                            defaultValue={this.props.fontSize}
                            marks={{
                                15: 15,
                                20: 20,
                                25: 25,
                                30: 30,
                                35: 35,
                                40: 40,
                                45: 45,
                                50: 50
                            }}
                            onChange={newVal => this.props.changeFontSize(newVal)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col {...spacing}>
                        <Breadcrumb separator="/" style={{ marginTop: "60px" }}>
                            <Breadcrumb.Item>Boards</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row>
                    <Col {...spacing} style={{ marginTop: 20 }}>
                        <div>{this.props.board.description}</div>
                    </Col>
                </Row>

                <Row>
                    <Col
                        {...spacing}
                        style={{
                            marginTop: 80
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <Input
                                allowClear
                                addonAfter={
                                    <Select
                                        style={{ width: 150 }}
                                        defaultValue="critical"
                                        onChange={option => this.setState({ currentPriority: option })}
                                    >
                                        <Select.Option value="critical"> Critical </Select.Option>
                                        <Select.Option value="major"> Major </Select.Option>
                                        <Select.Option value="minor"> Minor </Select.Option>
                                        <Select.Option value="trivial"> Trivial </Select.Option>
                                    </Select>
                                }
                                value={this.state.currentDraft}
                                size="large"
                                placeholder="Add item..."
                                onChange={e => this.setState({ currentDraft: e.target.value })}
                                onPressEnter={e => {
                                    e.preventDefault();
                                    let nextItem = e.target.value;
                                    this.props.addItemToBoard(nextItem, this.props.title, this.state.currentPriority);
                                    this.setState({
                                        currentDraft: ""
                                    });
                                }}
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col
                        {...spacing}
                        style={{
                            marginBottom: 150
                        }}
                    >
                        <Table
                            style={{
                                marginTop: 30
                            }}
                            size="large"
                            dataSource={this.props.board.items.map((item, index) => {
                                return { ...item, key: index };
                            })}
                            columns={[
                                {
                                    title: "Priority",
                                    dataIndex: "priority",
                                    key: "piority",
                                    render: (prt, record) => {
                                        let color = {
                                            critical: "volcano",
                                            major: "orange",
                                            minor: "blue",
                                            trivial: "cyan"
                                        }[prt];

                                        return (
                                            <Tag color={color} key={record.key}>
                                                {prt.toUpperCase()}
                                            </Tag>
                                        );
                                    },
                                    filters: [
                                        {
                                            text: "Critical",
                                            value: "critical"
                                        },
                                        {
                                            text: "Major",
                                            value: "major"
                                        },

                                        {
                                            text: "Minor",
                                            value: "minor"
                                        },
                                        {
                                            text: "Trivial",
                                            value: "trivial"
                                        }
                                    ],
                                    onFilter: (value, record) => {
                                        return record.priority === value;
                                    },
                                    sorter: (a, b) => {
                                        let pts = ["critical", "major", "minor", "trivial"];
                                        let map = {};
                                        pts.map((item, index) => Object.assign(map, { [item]: index }));
                                        return map[a.priority] - map[b.priority];
                                    },
                                    sortDirections: ["ascend", "descend"]
                                },
                                {
                                    title: "Description",
                                    dataIndex: "text",
                                    key: "text",
                                    render: (text, record) => {
                                        let style = {
                                            fontSize: this.props.fontSize
                                        };
                                        if (record.done) {
                                            style = {
                                                ...style,
                                                fontStyle: "italic",
                                                textDecoration: "line-through"
                                            };
                                        }
                                        return <span style={style}>{text}</span>;
                                    }
                                },
                                {
                                    title: "Done",
                                    dataIndex: "done",
                                    key: "done",
                                    render: (bool, record) => {
                                        let cls = "fa " + (bool ? "fa-check text-success" : "fa-times text-danger");
                                        return <i className={cls} />;
                                    },
                                    sorter: (a, b) => {
                                        let map = {
                                            true: 0,
                                            false: 1
                                        };
                                        return map[a.done] - map[b.done];
                                    },
                                    filters: [
                                        {
                                            text: "Done",
                                            value: true
                                        },
                                        {
                                            text: "Undone",
                                            value: false
                                        }
                                    ],
                                    onFilter: (value, record) => {
                                        return record.done === value
                                    },
                                    filterMultiple: false
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </>
        );
    }
}
