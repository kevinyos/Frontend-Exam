import React,{Component} from 'react';
// import Axios from 'axios';
import { Button } from 'reactstrap';
// import {API_URL} from '../Support/API_URL'
import Select  from 'react-select'
import { connect } from 'react-redux';
import { fetchDataById,pushCartProduct,cartProduct } from '../Redux/Action'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


class ProductDetail extends Component {
    state = { 
        size:[
            { value: '38', label: '38' },
            { value: '39', label: '39' },
            { value: '40', label: '40' },
            { value: '41', label: '41' },
            { value: '42', label: '42' },
            { value: '43', label: '43' },
            { value: '45', label: '45' }
          ],
          qty:[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' }
          ],
          selectedSize:38,
          selectedQty:1
     }

    componentDidMount(){
        let id= this.props.location.search.split('=')[1]
        this.props.fetchDataById(id)
        // let id =this.props.location.search.split('=')[1] //?INI UNTUK AMBIL ANGKANYA SAJA
        // console.log(id)
        // Axios.get(`${API_URL}/products/${id}`)
        // .then((res)=>{
        //     this.setState({
        //         data:res.data
        //     })
        //     console.log(this.state.data)
        // })
        // .catch((err)=>{

        // })
    }

    addToCart = () =>{
        let { data } = this.props
        let userID = this.props.userID
        let name = data.name
        let productID = data.id
        let price = data.price
        let image = data.image
        let size = this.state.selectedSize
        let qty = this.state.selectedQty;
        let total = data.price*qty
        let obj ={
            qty,
            userID,
            name,
            productID,
            price,
            total,
            image,
            size
        }
        console.log(obj)
        this.props.pushCartProduct(obj)
        this.props.cartProduct()
    }


    render() { 
        // console.log(this.state.selectedSize)
        if(this.props.loading){
            return(
                <div className='loader'>
                    <center>
                        <Loader type="Bars" color="#somecolor" height={80} width={80} />
                    </center>
                </div>
            )
        }
        if(this.props.error){
            return(
                <div>
                    <center>
                        {this.props.error}
                    </center>
                </div>
            )
        }
        let { data } = this.props
        return ( 
            <div className='row'>
                <div className='col-4' style={{marginTop:'5%', marginLeft:'5%'}}>
                    <img src={data.image} alt={data.name} style={{width:'100%'}}/>
                </div>
                <div className='col-6' style={{padding:'5%'}}>
                    <div>
                        <h1>{data.name}</h1>
                    </div>
                    <div>
                        <h3>{data.brand}</h3>
                    </div>
                    <div>
                        <h3>{data.category}</h3>
                    </div>
                    <div>
                        <h1>Rp.{
                            data.price
                            ?
                            data.price.toLocaleString()
                            :
                            null
                            }.-</h1>
                    </div>
                    <div style={{marginRight:'70%'}} ref='size'>
                         <Select options={this.state.size} onChange={(e)=>{this.setState({selectedSize:e.value})}}/>
                    </div>
                    <div style={{marginRight:'70%'}} ref='qty'>
                         <Select options={this.state.qty} onChange={(e)=>{this.setState({selectedQty:parseInt(e.value)})}}/>
                    </div>
                    <div style={{position:'absolute', marginTop:'10%', marginLeft:'60%'}}>
                        <Button color='primary' onClick={()=>this.addToCart()}>Add to Cart</Button>
                    </div>
                </div>
            </div>
         );
    }
}
 const mapStateToProps = (state)=>{
     return{
         data : state.products.productById,
         loading : state.products.loading,
         error: state.products.error,
         userID: state.auth.id
        }
 }
 
export default connect(mapStateToProps,{fetchDataById, pushCartProduct,cartProduct} ) (ProductDetail);