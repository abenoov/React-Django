import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Header from "./components/header";
import ProductList from './components/product-list';
import ProductDetails from './containers/product-details';
import Cart from './containers/cart';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import jwt_decode from 'jwt-decode'
import {SET_CURRENT_USER} from './store/actions/types'
import setAuthToken from './common/setAuthToken'


if(localStorage.getItem('tokens')) {
  const accessToken = JSON.parse(localStorage.getItem('tokens')).access
  const payload = jwt_decode(accessToken)
  setAuthToken(accessToken)
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: payload.user_id
  })
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>
            <Route exact component={ProductList} path="/"/>
            <Route exact component={Cart} path="/cart"/>
            <Route exact component={ProductDetails} path="/product/:id" />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
