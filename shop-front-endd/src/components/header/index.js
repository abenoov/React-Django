import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Menu, Icon, Modal, Button, Form, Input } from 'antd';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom'
import SignUpModal from '../auth/signupModal'
import LogInModal from '../auth/loginModal'
import {connect} from 'react-redux'
import {logoutUser} from '../../store/actions/authActions'

import './header.css';

const a = {
  name:"asd",
  age:24
}
const { age } = a
const { SubMenu } = Menu;

class Header extends Component {
    constructor() {
        super()
        this.state = {
            openLogIn: false,
            openSignUp: false,
            itemsLength: 0
        }
    }


    openLogIn = () => {
        this.setState({openLogIn: true})
    }

    openSignUp = () => {
        this.setState({openSignUp: true})
    }

    closeSignUp = () => {
        this.setState({openSignUp: false})
    }

    closeLogIn = () => {
        this.setState({openLogIn: false})
    }


    componentWillReceiveProps(nextProps) {
        console.log("Hello", nextProps)
        if(nextProps.auth.isAuthenticated) {
            this.setState({ openLogIn: false, openSignUp: false})
        }
    }


    render() {
        const isAuth = this.props.auth.isAuthenticated;

        let authMenu = (
            <Menu mode = "horizontal">
                <Menu.Item key = {1} onClick={this.openSignUp}>Sign Up</Menu.Item>
                <Menu.Item key = {2} onClick={this.openLogIn}>Log In</Menu.Item>
            </Menu>
        )
        if(isAuth)
            authMenu = (
                <Menu mode = "horizontal">
                    <Menu.Item key = {1}><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key = {2}>About</Menu.Item>
                    <Menu.Item key = {3}>Products</Menu.Item>
                    <Menu.Item key = {4}>Contacts</Menu.Item>
                    <Menu.Item key = {5}><Link to="/cart">Cart ({this.props.cart.products.length})</Link></Menu.Item>
                    <Menu.Item key = {6} onClick={this.props.logoutUser}>Logout</Menu.Item>
                </Menu>
        )


    return(
        <header className ="header">
            <Row>
                <Col span = {6}>
                    <img className = "logo" src = {logo} alt = ""/>
                </Col>
                <Col span = {18}>
                    {authMenu}
                </Col>
            </Row>

            <div className = "header-actions">

            </div>
            <SignUpModal openSignUp={this.state.openSignUp} onClose={this.closeSignUp}/>
            <LogInModal openLogIn={this.state.openLogIn} onClose={this.closeLogIn}/>
        </header>
    )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    cart: state.cart
})

export default connect(mapStateToProps, {logoutUser})(Header)
