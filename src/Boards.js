import React, { Component } from "react";
import { Row, Col, Card, Slider, List, Tag } from "antd";

export default class Boards extends Component {
    constructor(props) {
        super(props);
        this.marks = {
            ...[1, 2, 3, 4].map((item, index) => {
                return { [index + 1]: item };
            })
        };
    }
    render() {
        let boards = Object.keys(this.props.boards);
        let rows = [];
        let cols = [];
        for (let [index, boardName] of boards.entries()) {
            let items = this.props.getBoardClone(boardName).items.slice(0, 11);
            // continue to append
            let color = {
                critical: "volcano",
                major: "orange",
                minor: "blue",
                trivial: "cyan"
            };
            let newCard = (
                <Card
                    title={boardName}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 300,
                        height: 400,
                        overflow: "auto"
                    }}
                >
                    <List
                        split={false}
                        size="large"
                        dataSource={items}
                        renderItem={item => (
                            <List.Item>
                                <span>
                                    <Tag color={color[item.priority]}>{item.priority.toUpperCase()}</Tag>
                                    <span>{item.text}</span>
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            );

            cols.push(
                <Col
                    span={Math.floor(24 / this.props.columns)}
                    key={index}
                    style={{
                        padding: "2%"
                    }}
                >
                    {newCard}
                </Col>
            );
            if (cols.length === this.props.columns || index === boards.length - 1) {
                // close the row
                rows.push(<Row key={rows.length}>{cols}</Row>);
                cols = [];
            }
        }
        return (
            <>
                <Row>
                    <Col span={8} offset={8}>
                        <h4
                            style={{
                                marginTop: "30px",
                                textAlign: "center"
                            }}
                        >
                            Grid Columns
                        </h4>
                        <Slider
                            marks={this.marks}
                            min={1}
                            max={4}
                            defaultValue={this.props.columns}
                            onChange={newKey => {
                                this.props.onColSliderChange(newKey);
                            }}
                        />
                    </Col>
                </Row>
                {rows}
            </>
        );
    }
}
