import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import Axios from "axios";
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';
import { Redirect } from 'react-router-dom'
// import {API_URL} from '../Support/API_URL'

class LoginPage extends Component{
  state={

  }

  onBtnLogin = () =>{
      let username = this.username.value;
      let password = this.password.value;
      
      this.props.Login(username,password)
   
      
      //!PENULISAN LAMA MASI MENGGUNAKAN SYNCRONUS BELU ASYNC
      // axios.get(`${API_URL}/users?username=${username}&password=${password}`)//templatestring(user dan password dinamsi tergantung varnya)
      // .then((res)=>{
      //   console.log(res.data)
      //   if(res.data.length===0){//gaada data yang diambil
      //     window.alert('User doesnt Exist')
      //   }else{
      //     let{id,username,password,role} = res.data[0]  //masukin array data ke dalam reducer
      //     this.props.Login({id,username,password,role})//action creator
      //     localStorage.setItem('username',JSON.stringify({username,password}))  //Ini simpen token untuk simpan local storage
      //     //?JSON STRINGIFY buat nyimpen local store tapi untuk jadiin ke string untuk membuka object dalam object
      //   }
      // })
      // .catch((err)=>{
      //   console.log(err)
      // })
  }


  render(){
    if(this.props.logged){
      return(
        <Redirect to='/'/>
      )
    }
    return (
      <Form className ='form-regist'>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" placeholder="username" innerRef={(username => this.username = username)} />
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="password" innerRef={(password) => this.password=password} />
        </FormGroup>
        <Button color='info' onClick={this.onBtnLogin}>Login</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    logged:state.auth.logged
  }
}

export default connect(mapStateToProps,{Login}) (LoginPage);
