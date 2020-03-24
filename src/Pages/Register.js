import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { API_URL } from '../Support/API_URL'
import {connect} from 'react-redux'
import {Login} from '../Redux/Action'
import Swal from 'sweetalert2';

class Register extends Component {
  state = { 

   }

   onBtnRegister = () =>{
     let username = this.username.value;
     let email = this.email.value;
     let password1 = this.password.value;
     let password2 = this.confirmPassword.value;
     let symbol = /^(?=.*\d)(?!.*\s)$/;
    
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
        axios.get(`${API_URL}/users?username=${username}`)
        .then((res)=>{
          if(res.data.length>0){
            window.alert('Username already exists')
          }else{
            axios.post(`${API_URL}/users`,//Post terima param ke2 untuk menambakkan ke API bentuk obj
            {
              username, //data yang mau di tambahin(id autoincrement)
              email,
              password:this.password.value,
              role:'user'
            })
            .then((res)=>{
              let{username,email,role,id} = res.data;
              this.props.Login({
                username,
                email,
                role,
                id
              })
            }) 
          }
        })
        .catch((err)=>{
            console.log(err)
        })
     }
   }



  render() { 
    if(this.props.logged){
      return(
        <Redirect to='/'/>
      )
    }
    return ( 
      <Form className ='form-regist'>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input type="text" name="username" id="username" placeholder="Username" innerRef={(username)=>this.username=username} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="e-mail" innerRef={(email)=>this.email=email} />
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input type="password" name="password" id="password" placeholder="Password" innerRef={(password)=>this.password=password}/>
        </FormGroup>
        <FormGroup>
        <Label for="confirmPassword">Confirm Password</Label>
        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" innerRef={(confirmPassword)=>this.confirmPassword=confirmPassword} />
      </FormGroup>
      <Button color='info' onClick={this.onBtnRegister}>Register</Button>
      <Button style={{marginLeft:'1rem'}}>Login</Button>
    </Form>
     );
  }
}
const mapStateToProps = (state) =>{
  return{
    logged:state.auth.logged
  }
}
export default connect(mapStateToProps,{Login}) (Register);
