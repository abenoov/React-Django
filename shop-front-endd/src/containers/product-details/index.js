import React, { Component } from 'react';
import {Row,Col, Typography, Card, Button, Icon } from 'antd'
import { Comment, Tooltip, List } from 'antd';
import { Avatar, Form, Input } from 'antd';
import moment from 'moment';
import axios from 'axios'
import {addToCart} from '../../store/actions/cartActions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} name="commentText" onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );
const ButtonGroup = Button.Group
const {Title, Text} = Typography

class ProductDetails extends Component{
    constructor(){
        super()

        this.state = {
            product: {},
            comments: [],
            submitting: false,
            commentText: ``,
            amount: 1,
        }
    }

    changeAmount = val => {
        this.setState({amount: this.state.amount + val})
    }

    componentDidMount(){
      console.log(this.props.match.params.id)
      axios.get(`/api/products/${this.props.match.params.id}`)
        .then(res => {
            console.log(res.data)
            this.setState({product: res.data})
        })
        .catch(err => {
            console.log(err)
        })

        axios.get(`/api/comments/${this.props.match.params.id}`)
            .then(res => {
                this.setState({comments: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onClick = () => {
        this.props.addToCart({
            product: this.props.match.params.id, 
            amount: this.state.amount,
        })
    }

    handleSubmit = e => {
        if(this.state.commentText !== ``) {
            axios.post(`/api/comments/`, {
                product: this.props.match.params.id,
                text: this.state.commentText
            })
            .then(res => {
                console.log(res)

                this.setState({comments: [...this.state.comments, res.data], commentText: ``})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    render(){
        const {product} = this.state
        return (
        <div className="content">
            <Row>
                <Col span={8}>
                    <img width="100%" src={product.img}/>
                </Col>
                <Col span={8}>
                    <Title level={3}>{product.name}</Title>
                    <Text>{product.description}</Text>
                    <Text>{product.category}</Text>
                </Col>
                <Col span={8}>
                    <Card>
                        <Text>Price: {product.price}</Text>
                        <div>
                            <ButtonGroup>
                                <Button onClick={() => this.changeAmount(-1)}><Icon type="minus" /></Button>
                                <Button> {this.state.amount} </Button>
                                <Button onClick={() => this.changeAmount(1)}><Icon type="plus" /></Button>
                            </ButtonGroup>
                        </div>
                        <Button type="primary" onClick={this.onClick}>Add to Card</Button>
                    </Card>
                </Col>
            </Row>

            <List
                className="comment-list"
                header={`${this.state.comments.length} replies`}
                itemLayout="horizontal"
                dataSource={this.state.comments}
                renderItem={item => (
                <li>
                    <Comment
                    author={item.user.username}
                    avatar={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
                    content={item.text}
                    datetime={moment(item.date)
                        .fromNow()}
                    />
                </li>
                )}
            />
            <Comment
                avatar={
                    <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                    />
                }
                content={
                    <Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={this.state.submitting}
                    value={this.state.commentText}
                    />
                }
                />
          </div>
        )
    }
}

export default connect(null, {addToCart})(withRouter(ProductDetails))
