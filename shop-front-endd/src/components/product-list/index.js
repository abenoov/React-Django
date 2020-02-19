import React, { Component } from 'react';
import { Card,Row,Col } from 'antd'
import {withRouter} from 'react-router-dom'
import axios from 'axios'


class ProductList extends Component{
    constructor(){
        super()

        this.state = {
            products: [],
            count: 0,
            title: "Hello",
            search: "",
            categories: [],
            cat_id: 0
        }
        this.onChange = this.onChange.bind(this)
    }

    onClick = (id) => {
       return () => {
           this.props.history.push(`/product/${id}`)
       }
    }

    componentDidMount(){
        console.log("1")
      axios.get('/api/products')
        .then(res => {
            this.setState({products: res.data})
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })


        axios.get('/api/categories/')
          .then(res => {
              this.setState({categories: res.data})
              console.log(res.data)
          })
          .catch(err => {
              console.log(err)
          })
    }

    onChange = (e) => {
      this.setState({search: e.target.value})
      this.requestBack(e.target.value, this.state.cat_id)
    }
    requestBack = (search, cat_id) => {
      axios.get(`/api/products/${search}/${cat_id}/search`)
        .then(res => {
            this.setState({products: res.data})
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
      })
    }

    filterByCategory = (cat_id) => {
      this.setState({cat_id})
      this.requestBack(this.state.search, cat_id)
    }

    render(){
        const {products, categories} = this.state
        console.log(categories)
        const categoriesList = categories.map(cat => (
        <li onClick={()=>this.filterByCategory(cat.id)}>{cat.category}</li>
        ))
        const productList = products.map(item =>(
          <Col span={8} key = {item.id}>
            <Card 
                  onClick={this.onClick(item.id)}
                  title="Default size card"
                  extra={<a href="#">More</a>}
                  style={{ marginBottom: "16px", }}>
              <p>{item.id}</p>
              <p>{item.name}</p>
              <p>{item.price}</p>
              {/*<p>{item.category.category}</p>*/}
              </Card>
          </Col>
        ))

        return (
          <div>
            <ul>
              {categoriesList}
            </ul>
            <input value={this.state.search} onChange={this.onChange} type="text"  />
            {this.state.title}
            <Row gutter = {16}>
              {productList}
            </Row>
          </div>

        )
    }
}

export default withRouter(ProductList)
