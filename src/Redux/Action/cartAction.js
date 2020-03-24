import Axios from 'axios';
import {API_URL} from '../../Support/API_URL'
import Swal from 'sweetalert2';

export const cartProduct=(id)=>{
    return(dispatch)=>{
        Axios.get(`${API_URL}/cart?userID=${id}`)
        .then((res)=>{
            // cons
            console.log(res)
            dispatch({
                type:'LOAD_CART',
                payload:res.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const pushCartProduct=(obj)=>{
    return(dispatch)=>{
        Axios.post(`${API_URL}/cart`,obj)
        .then((res)=>{
            Swal.fire(
                'Added To Cart',
                'success'
            )
            dispatch({
                type:'LOAD_CART' 
            })
        })
        .catch((err)=>{

        })
    }
}

export const deleteCartProduct =(id,x)=>{
    return(dispatch)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            imageUrl:x, //ngeluarin imagenya dari function buttonnya dipindah ke paramerter dan ditarik kesiini
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          .then((result) => {
            if (result.value) {
            Axios.delete(`${API_URL}/cart/${id}`)
            .then((res)=>{
                console.log(res)
                Swal.fire(
                  'Deleted!',
                  'Your item has been deleted.',
                  'success'
                )
                Axios.get(`${API_URL}/cart`)
                .then((res)=>{
                    dispatch({
                        type: 'LOAD_CART',
                        payload: res.data
                    })
                })
                .catch((err)=>{
                    dispatch({
                        type:'FETCH_DATA_FAILED'
                    })
                })
            })
            }
          })
          .catch((err)=>{
              console.log(err)
          })
    }
}

export const checkout=(obj,id)=>{
    return(dispatch)=>{
        Axios.post(`${API_URL}/transaction?userID=${id}`,obj)
        .then((result)=>{
            if(result){
                Axios.delete(`${API_URL}/cart?userID=${id}`,obj)
                Swal.fire(
                'Checkouted',
                'success'
                )
                Axios.get(`${API_URL}/cart`)
                .then((res)=>{
                    dispatch({
                        type: 'LOAD_CART',
                        payload: res.data
                    })
                })
                .catch((err)=>{
                    dispatch({
                        type:'FETCH_DATA_FAILED'
                    })
                })    
            }   
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}