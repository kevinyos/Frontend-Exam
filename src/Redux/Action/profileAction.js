import Axios from 'axios';
import {API_URL} from '../../Support/API_URL'
import Swal from 'sweetalert2'
//async digunakan untuk membuat global function
export const changePassword=(password,password1,password2)=>{
    return(dispatch)=>{//hasil data dari sini mau di taro di global state   
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
        }else if(password1.match(/^(?=.*\d)(?!.*\s)$/)){
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
        }
        else{
            Axios.get(`${API_URL}/users?password=${password}`)
            .then((res)=>{
                  localStorage.setItem('token',JSON.stringify({
                        password: res.data[0].password,
                    })) 
                  dispatch({
                      type:'CHANGEPASSWORD',
                      payload:res.data[0]//ini untuk isi initial state. data diambil langsung dari axios
                  })
              }  
        )
        .catch((err)=>{
            console.log(err)
        }) 
        }
        
    }
}

//INI UTWK TOKEN LOGIN
// export const keepLogin =(token) =>{
//     return(dispatch)=>{
//         token=JSON.parse(token)//set itemnya ada di login
//         let{username,password} = token
//         Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
//         .then((res)=>{
//             dispatch({
//                 type:'LOGIN',
//                 payload:res.data[0]
//             })
//         })
//         .catch((err)=>{
//             dispatch({
//                 type:'LOGOUT'
//             })
//         })
//     }
// }


// export const Logout =(data)=>{
//     return{
//         type:'LOGOUT'
//     }
// }