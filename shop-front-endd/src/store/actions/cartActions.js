import {SET_CART, ADD_TO_CART, DELETE_FROM_CART} from './types'
import axios from 'axios'

export const getCart = () => dispatch => {
    axios.get('/api/basket/')
        .then(res => {
            dispatch({
                type: SET_CART,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log(err)
        })
}


export const addToCart = data => dispatch => {
    axios.post('/api/basket/', data)
        .then(res => {
            dispatch({
                type: ADD_TO_CART,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log(err)
        })
}


export const deleteFromCart = id => dispatch => {
    axios.delete(`/api/basket/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_FROM_CART,
                payload: id
            })
        })
        .catch(err=>{
            console.log(err)
        })
}


