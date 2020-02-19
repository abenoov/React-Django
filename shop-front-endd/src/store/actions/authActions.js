import {SET_CURRENT_USER} from './types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../../common/setAuthToken'

export const loginUser = userData => dispatch => {
    axios.post('/api/token/', userData)
        .then(res => {
            
            localStorage.setItem('tokens', JSON.stringify(res.data))
            setAuthToken(res.data.access)
            const payload = jwt_decode(res.data.access)
            dispatch({
                type: SET_CURRENT_USER,
                payload: payload.user_id
            })
        })
        .catch(err=>{
            console.log(err)
        })
}


export const logoutUser = () => dispatch => {
    localStorage.removeItem('tokens')
    dispatch({
        type: SET_CURRENT_USER,
        payload: null
    })
}


export const signupUser = userData => dispatch => {
    axios.post('/api/auth/signup', userData)
        .then(res => {
            loginUser(userData)(dispatch)
        })
        .catch(err=> {
            console.log(err)
        })
}