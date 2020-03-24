import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Login } from '../Redux/Action'
//HOOOK
const Review = () =>{
    const [contoh, setContoh] = useState(0)//?awal render , contoh init awal bisa num,string,array,obj,dll, set contoh buat ganti
    // !const logged = useSelector((state)=>state.auth.logged) //unutk ambil 1 data dari redux, PENGGANTI mapStateToProps
    const logged = useSelector((state)=>{
        return{
            logged:state.auth.logged,
            role:state.auth.role
        }
    }) //?unutk ambil lebih dari 1 data dari redux
    console.log(logged)

    const dispatch = useDispatch() //?harus di dispatch dl 
    const LoginHooks = () =>{ //!PENGGANTI ACTION CREATOR
        dispatch(Login({
            username:'Fadhy Yusuf',
            email:'fadhy.yusuf@gmail.com',
            role: 'admin',
            password:'123'
        }))
    }
    
    return(
        <div>
        <input type='button' value='-' onClick={ ()=>setContoh(contoh-1)}/>
         {contoh}
        <input type='button' value='+' onClick={ ()=>setContoh(contoh+1)}/>
        <input type='button' value='Login' onClick={LoginHooks}/>
        </div>
        
    )
}

export default Review;