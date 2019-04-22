import React, { Component } from "react";
import { Row, Col, Card } from "antd";

export default class Lists extends Component {
    render() {
        const COLS_NUMBER = this.props.COLS_NUMBER || 3;
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
                >
                    {newCard}
                </Col>
            ];
            if (cols.length === COLS_NUMBER || index === lists.length - 1) {
                // close the row
                rows = [...rows, <Row key={rows.length}>{cols}</Row>];
                cols = [];
            }
        }
        return <>{rows}</>;
    }
}
