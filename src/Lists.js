import React, { Component } from "react";
import { Row, Col, Card } from "antd";

const COLS_NUMBER = 3;

export default class Lists extends Component {
    render() {
        let lists = Object.keys(this.props.lists);
        let rows = [];
        let cols = [];
        for (let [index, item] of lists.entries()) {
            // continue to append
            let newCard = (
                <Card title={item} style={{ width: 200 }}>
                    oggetti dentro
                </Card>
            );

            cols = [
                ...cols,
                <Col
                    span={Math.floor(24 / COLS_NUMBER)}
                    key={index}
                    style={{
                        padding: "2%",
                        border: "1px solid red"
                    }}
                >
                    {newCard}
                </Col>
            ];
            if (cols.length === COLS_NUMBER || index === lists.length - 1) {
                // close the row
                rows = [
                    ...rows,
                    <Row key={rows.length}>
                        {cols}
                    </Row>
                ];
                cols = [];
            }
        }
        return <>{rows}</>;
    }
}
