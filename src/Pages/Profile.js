import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import { connect } from 'react-redux';
import { changePassword } from '../Redux/Action';
import { Redirect } from 'react-router-dom'
import {API_URL} from '../Support/API_URL'
import Swal from 'sweetalert2';

class Profile extends Component{
  state={
    password:'',
    password1:'',
    password2:''
  }

  changePass = () => {
    let password = this.password.value
    let password1 = this.password1.value
    let password2 = this.password2.value
    // console.log(password,password1,password2)
    // this.props.changePassword(password,password1,password2)
    let symbol = /^(?=.*\d)(?!.*\s)$/;
    
    // axios.get(`${API_URL}/users?password=${password}`)
    // .then((res)=>{
    //     if(res.data!==password){
    //         window.alert('Wrong Password')
    //     }
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
     if(!password1){
          return(
              Swal.fire(
                'Wrong',
                'Password does not satisfy the requirement!',
                'Warning'
              )
          )
      }else if(password1.length<8){
          return(
              Swal.fire(
                'Wrong',
                'Password does not satisfy the requirement! It is not long enough',
                'Warning'
              )
          )
      }else if(/([0-9]+)/g.test(parseInt(password1))){
        return(
          Swal.fire(
              'Wrong',
              'Password does not satisfy the requirement! It does not include number',
              'Warning'
          )
        )
      }else if(password1.match(symbol)){
        return(
          Swal.fire(
              'Wrong',
              'Password does not satisfy the requirement! It does not include symbols',
              'Warning'
          )
        )
      }else if(!password2){
        return(
          Swal.fire(
              'Wrong',
              'Password does not satisfy the requirement! Both needs to be filled',
              'Warning'
          )
        )
      }else if(password1!==password2){
        return(
          Swal.fire(
              'Wrong',
              'Password does not satisfy the requirement! Passwords do not match',
              'Warning'
          )
        )
    }else{
        axios.get(`${API_URL}/users?password=${password}`)
        .then((res)=>{
            axios.post(`${API_URL}/users`,//Post terima param ke2 untuk menambakkan ke API bentuk obj
            {
              password:this.password2.value,
            })
            // .then((res)=>{
            //   let{username,email,role,id} = res.data;
            //   this.props.Login({
            //     username,
            //     email,
            //     role,
            //     id
            //   })
            // }) 
          }
        )
        .catch((err)=>{
            console.log(err)
        })
    }}

  render() {

    return (
      <Form className ='form-regist'>
        <FormGroup>
          <Label for="Password">Old Password</Label>
          <Input type="password" name="password" id="password" placeholder="password" innerRef={(password) => this.password=password} />
        </FormGroup>
        <FormGroup>
          <Label for="Password1">New Password</Label>
          <Input type="password" name="password1" id="password1" placeholder="password" innerRef={(password1) => this.password1=password1} />
        </FormGroup>
        <FormGroup>
          <Label for="Password2">Reinput New Password</Label>
          <Input type="password" name="password2" id="password2" placeholder="password" innerRef={(password2) => this.password2=password2} />
        </FormGroup>
        <Button color='info' onClick={this.changePass}>changePassword</Button>
      </Form>
    );
    }
}

const mapStateToProps = (state) =>{
    return{
      logged:state.auth.logged
    }
  }
  export default connect(mapStateToProps)(Profile);