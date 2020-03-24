import React, { Component } from 'react';
import './App.css';

import{Route} from 'react-router-dom'

import Home from './Pages/Home'
import NavBar from './Components/NavBar'
import LoginPage from './Pages/Login'
import Register from './Pages/Register'
import Cart from './Pages/Cart'
import Transaction from './Pages/Transaction'
import Products from './Pages/Products'
import ProductDetail from './Pages/ProductDetail'
import LatihanAxios from './Pages/LatihanAxios'
import Review from './Pages/Review'
import ManageProduct from './Pages/ManageProduct'
import Profile from './Pages/Profile'
// import Axios from 'axios';
// import {API_URL} from './Support/API_URL'
import { Login,keepLogin } from './Redux/Action'
import { connect } from 'react-redux'

class App extends Component{

  componentDidMount(){//LOCALSTORAGE //!udh di pindah ke authActrion yang di comment pas paling pertama belajar

    let token = localStorage.getItem('token')
    if(token){//?mikir apa nih logic ifnya!
      this.props.keepLogin(token)
    }
    // if(token){
    //   console.log(JSON.parse(token))
    //       console.log(token)
    //       let tokenParse = JSON.parse(token)//untuk menjadikan object dari stringify di jadikan object yuntuk dibaca
    //       Axios.get(`${API_URL}/users?username=${tokenParse.username}&password=${tokenParse.password}`)
    //       .then((res)=>{
    //       console.log(res.data)
    //       let {username,email,password,role,id} = res.data[0]
    //       this.props.Login({
    //         id,
    //         username,
    //         password,
    //         email,
    //         role
    //       }) 
    //     })
    //     .catch((err)=>{
    //       console.log(err)
    //     })
    // }
  }
  
  render(){
    return (
      <div>
  
      <NavBar />
      <Route path='/' component={Home} exact/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/register' component={Register}/>
      <Route path='/cart' component={Cart}/>
      <Route path='/transaction' component={Transaction}/>
      <Route path='/products' component={Products}/>
      <Route path='/product-detail' component={ProductDetail}/>
      <Route path='/manage-product' component={ManageProduct}/>
      <Route path='/profile' component={Profile}/>
  
      <Route path='/latihan' component={LatihanAxios}/>
      <Route path='/review' component={Review}/>
      
      </div>
    );
  }
}

export default connect (null,{Login, keepLogin}) (App);
