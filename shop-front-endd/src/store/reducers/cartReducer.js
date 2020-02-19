


import {SET_CART, ADD_TO_CART, DELETE_FROM_CART} from '../actions/types'
const initialState = {
    products: [],
}


export default function (state=initialState, action) {
    switch(action.type) {
        case SET_CART: 
            return {
                ...state,
               products: action.payload
            }
        case ADD_TO_CART: 
            console.log(state, action.payload)
            return {
                ...state,
               products: [...state.products, action.payload]
            }
        
        case DELETE_FROM_CART: 
            return {
                ...state,
               products: deleteById(action.payload, state.products)
            }
        default:
            return state


            
    }
}



function deleteById(id, arr) {
    for(let i = arr.length - 1; i >= 0; i--) {
        if(arr[i].id === id) {
            arr.splice(i, 1);
            return arr;
        }
    }
}




// let arr = [1, 2, 3 ,5]
// let b = 100

// arr = [...arr, b]; // arr = [1, 2, 3 ,5, 100]

