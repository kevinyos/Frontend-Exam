import Axios from 'axios'
import {API_URL} from '../../Support/API_URL'

export const fetchTransaction=(id)=>{
    return(dispatch)=>{
        Axios.get(`${API_URL}/transaction?userID=${id}`)
        .then((res)=>{
            console.log(res)
            dispatch({
                type:'LOAD_TRANSACTION',
                payload:res.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}