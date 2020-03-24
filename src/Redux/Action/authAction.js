
import Axios from 'axios';
import {API_URL} from '../../Support/API_URL'
import Swal from 'sweetalert2'
//async digunakan untuk membuat global function
export const Login=(username,password)=>{
    return(dispatch)=>{//hasil data dari sini mau di taro di global state
        Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        .then((res)=>{
            if(res.data.length===0){
                return(
                  Swal.fire(
                    'Cant Login',
                    'Username or Password not found!',
                    'warning'
                  )
                )
              }else{
                  localStorage.setItem('token',JSON.stringify({
                        username: res.data[0].username,
                        password: res.data[0].password,
                        id: res.data[0].id
                    })) 
                  dispatch({
                      type:'LOGIN',
                      payload:res.data[0]//ini untuk isi initial state. data diambil langsung dari axios
                  })
              }
            
        })
        .catch((err)=>{
            dispatch({
                type:'LOGOUT'
            })
        })
    }
}

//INI UTWK TOKEN LOGIN
export const keepLogin =(token) =>{
    return(dispatch)=>{
        token=JSON.parse(token)//set itemnya ada di login
        let{username,password} = token
        Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        .then((res)=>{
            dispatch({
                type:'LOGIN',
                payload:res.data[0]
            })
        })
        .catch((err)=>{
            dispatch({
                type:'LOGOUT'
            })
        })
    }
}


export const Logout =(data)=>{
    return{
        type:'LOGOUT'
    }
}

//syncronus tanpa import hanya function aja
// export const Login =(data)=>{
    //     return{
        //         type:'LOGIN',
        //         payload: data 
        //     }
        // }
