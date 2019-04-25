import React, { Component } from "react";
import { Row, Col, Input, Form, Button, message } from "antd";
export default class CreateBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftTitle: "",
            draftDescription: "",
            redirectDashboard: false
        };
    }
    render() {
        return (
            <>
                <Row>
                    <Col
                        style={{
                            marginTop: 100,
                            padding: 50,
                            boxShadow: "0px 0px 100px 0px #ddd",
                            backgroundColor: "white"
                        }}
                        span={10}
                        offset={7}
                    >
                        <Form>
                            <h3>Create a new board</h3>
                            <Form.Item style={{ marginTop: 50 }}>
                                <Input
                                    placeholder="Board name"
                                    onChange={e => {
                                        e.preventDefault();
                                        this.setState({ draftTitle: e.target.value });
                                    }}
                                    value={this.state.draftTitle}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input.TextArea
                                    placeholder="Description"
                                    onChange={e => {
                                        e.preventDefault();
                                        this.setState({ draftDescription: e.target.value });
                                    }}
                                    value={this.state.draftDescription}
                                    rows={5}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="default"
                                    onClick={() => {
                                        if (
                                            this.props.createBoard(this.state.draftTitle, this.state.draftDescription)
                                        ) {
                                            this.setState({ redirectDashboard: true });
                                            this.props.history.push("/")
                                            message.success("New board created!");
                                            this.props.history.push("/")
                                        }
                                    }}
                                >
                                    Create
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </>
        );
    }
}
