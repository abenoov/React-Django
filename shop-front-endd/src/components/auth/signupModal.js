import React, { Component } from 'react'
import { Menu, Icon, Modal, Button, Form, Input } from 'antd'
import {signupUser} from '../../store/actions/authActions'
import {connect} from 'react-redux'

class SignUpModal extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signupUser(values)
            }
        });
    };

    render() {
    const { getFieldDecorator } = this.props.form
    return (
        <Modal
                visible={this.props.openSignUp}
                title="Sign Up"
                onCancel={this.props.onClose}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign Up
                    </Button>
                    <br/> 
                    Or <a href="">login now!</a>
                    </Form.Item>
                </Form>
            </Modal>
    )
                    }
}

const WrapperSignUpModal =  Form.create({ name: 'signup_modal' })(SignUpModal)
export default connect(null, {signupUser})(WrapperSignUpModal)