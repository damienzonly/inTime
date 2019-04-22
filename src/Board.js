import React, { Component } from "react";
import { Row, Col, Input, Breadcrumb, List } from "antd";
export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDraft: "",
            title: this.props.title,
            note: this.props.board.note
        };
        console.log(this.props.board.note);
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <Breadcrumb separator="/" style={{ marginLeft: "20vw", marginTop: "60px" }}>
                            <Breadcrumb.Item>Boards</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={12}
                        offset={6}
                        style={{
                            height: "10vh"
                        }}
                    >
                        <div>{this.props.board.note}</div>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={12}
                        offset={6}
                        style={{
                            marginTop: "100px"
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <Input
                                allowClear
                                value={this.state.currentDraft}
                                size="large"
                                placeholder="Add item..."
                                onChange={e => this.setState({ currentDraft: e.target.value })}
                                onPressEnter={e => {
                                    e.preventDefault();
                                    let nextItem = e.target.value;
                                    this.props.addItemToBoard(nextItem, this.state.title);
                                    this.setState({
                                        currentDraft: ""
                                    });
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6}>
                        <List
                            size="large"
                            dataSource={this.props.board.items.map(item => item.text)}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </Col>
                </Row>
            </>
        );
    }
}
