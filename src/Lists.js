import React, { Component } from "react";
import { Row, Col, Card } from "antd";

const COLS_NUMBER = 3;

export default class Lists extends Component {
    render() {
        let lists = Object.keys(this.props.lists);
        let rows = [];
        let cols = [];
        for (let [index, item] of lists.entries()) {
            if ((index % COLS_NUMBER === 0) & (index > 0)) {
                // close the row
                rows = [
                    ...rows,
                    <Row key={rows.length} justify="space-around">
                        {cols}
                    </Row>
                ];
                cols = [];
            }
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
                        padding: "2%"
                    }}
                    justify="center"
                >
                    {newCard}
                </Col>
            ];
        }
        if (cols) {
            rows = [
                ...rows,
                <Row key={rows.length} justify="space-around">
                    {cols}
                </Row>
            ];
        }
        return <>{rows}</>;
    }
}
