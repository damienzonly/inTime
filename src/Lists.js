import React, { Component } from "react";
import { Row, Col, Card, Slider } from "antd";

export default class Lists extends Component {
    constructor(props) {
        super(props);
        this.marks = {
            ...[1, 2, 3, 4].map((item, index) => {
                return { [index + 1]: item };
            })
        };
    }
    render() {
        let lists = Object.keys(this.props.lists);
        let rows = [];
        let cols = [];
        for (let [index, item] of lists.entries()) {
            // continue to append
            let newCard = (
                <Card
                    title={item}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 300
                    }}
                >
                    Inner content
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
            if (cols.length === this.props.columns || index === lists.length - 1) {
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
