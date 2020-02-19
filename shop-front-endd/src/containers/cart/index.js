import React, { Component } from 'react';
import { Card,Row,Col } from 'antd'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {getCart, deleteFromCart} from '../../store/actions/cartActions'
import {connect} from 'react-redux'

class Cart extends Component{
    constructor(){
        super()

        this.state = {
            products: [],
            count: 0,
            title: "Hello"
        }
    }

    onClick = (id) => {
       return () => {
           this.props.history.push(`/product/${id}`)
       }
    }

    componentDidMount(){
        this.props.getCart()
    }

    componentDidUpdate(){

    }


    render(){
        const {products} = this.props.cart
        const productList = products.map(item =>(
          <Col span={8} key = {item.id}>
            <Card 
                  title="Default size card"
                  extra={<a href="#">More</a>}
                  style={{ marginBottom: "16px", }}>
              <p>{item.product.id}</p>
              <p>{item.product.name}</p>
              <p>{item.product.price}</p>
              <p>Amount: {item.amount}</p>
              <p onClick={() => this.props.deleteFromCart(item.id)}>Delete</p>
              </Card>
          </Col>
        ))

        return (
          <div>
            {this.state.title}
            <Row gutter = {16}>
              {productList}
            </Row>
          </div>

        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps, {getCart, deleteFromCart})(withRouter(Cart))
