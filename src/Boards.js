import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Slider, List, Tag, Divider } from "antd";

export default class Boards extends Component {
    constructor(props) {
        super(props);
        this.marks = {
            ...[1, 2, 3, 4].map((item, index) => {
                return { [item]: item };
            })
        };
    }
    render() {
        let boards = Object.keys(this.props.boards);
        let rows = [];
        let cols = [];
        for (let [index, boardName] of boards.entries()) {
            let items = this.props.getBoardClone(boardName).items.slice(0, 10);

            let color = {
                critical: "volcano",
                major: "orange",
                minor: "blue",
                trivial: "cyan"
            };
            let newCard = (
                <Card
                    title={
                        <div style={{ width: "auto", height: "auto" }}>
                            <Link to={`/board/${boardName}`}>{boardName.capFirst()}</Link>
                        </div>
                    }
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "auto",
                        maxWidth: 800,
                        height: 400,
                        overflow: "auto",
                        boxShadow: "0px 0px 100px 0px #ddd"
                    }}
                >
                    <List
                        size="large"
                        dataSource={items}
                        renderItem={item => (
                            <List.Item>
                                <span>
                                    <Tag color={color[item.priority]}>{item.priority.toUpperCase()}</Tag>
                                </span>
                                <Divider type="vertical" />
                                <span
                                    style={
                                        item.done
                                            ? { fontStyle: "italic", textDecoration: "line-through" }
                                            : {}
                                    }
                                >
                                    {item.text.capFirst()}
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
                        padding: "2%",
                        minWidth: 400
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
