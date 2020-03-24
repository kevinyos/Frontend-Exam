// export const Add=(data)=>{
//     return{
//         type:'ADD',
//         payload:data
//     }
// };
import Axios from 'axios'
import {API_URL} from '../../Support/API_URL'
import Swal from 'sweetalert2'

export const fetchProduct = () =>{
    return(dispatch)=>{
        dispatch({
            type:'FETCH_DATA_START'
        })
        Axios.get(`${API_URL}/products`)
        .then((res)=>{
            dispatch({
                type: 'FETCH_DATA_SUCCESS',
                payload: res.data
            })
        })
        .catch((err)=>{
            dispatch({
                type:'FETCH_DATA_FAILED'
            })
        })
    }
}



export const fetchDataById = (id) =>{
    return(dispatch)=>{
        dispatch({
            type:'FETCH_DATA_START'
        })
        Axios.get(`${API_URL}/products/${id}`)
        .then((res)=>{
            dispatch({
                type:'FETCH_DATA_BY_ID_SUCCESS',
                payload:res.data
            })
        })
        .catch((err)=>{
            dispatch({
                type:'FETCH_DATA_FAILED'
            })
        })
        
    }
}

export const editProducts =(id,obj)=>{
    return(dispatch)=>{
        Axios.patch(`${API_URL}/products/${id}`,obj)
        .then((res)=>{
            // console.log(res)
            Swal.fire(
                'Updated!',
                'Product Updated!',
                'success'
              )
              dispatch({
                type:'FETCH_DATA_START'
            })
            Axios.get(`${API_URL}/products`)
            .then((res)=>{
                dispatch({
                    type: 'FETCH_DATA_SUCCESS',
                    payload: res.data
                })
            })
            .catch((err)=>{
                dispatch({
                    type:'FETCH_DATA_FAILED'
                })
            })
            })
            .catch((err)=>{
                console.log(err)
                dispatch({
                    type:'FETCH_DATA_FAILED'
                })
            })
    }
}

export const deleteProduct =(id,x)=>{
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
            Axios.delete(`${API_URL}/products/${id}`)
            .then((res)=>{
                console.log(res)
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                dispatch({
                    type:'FETCH_DATA_START'
                })
                Axios.get(`${API_URL}/products`)
                .then((res)=>{
                    dispatch({
                        type: 'FETCH_DATA_SUCCESS',
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

export const addProduct=(productData)=>{
    return(dispatch)=>{
        Axios.post(`${API_URL}/products`,productData)
        .then((res)=>{
            console.log(res.data)
            Swal.fire(
                'Saved!',
                'Adding new product!',
                'success'
              )
              dispatch({
                type:'FETCH_DATA_START'
            })
            Axios.get(`${API_URL}/products`)
            .then((res)=>{
                dispatch({
                    type: 'FETCH_DATA_SUCCESS',
                    payload: res.data
                })
            })
            .catch((err)=>{
                dispatch({
                    type:'FETCH_DATA_FAILED'
                })
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}