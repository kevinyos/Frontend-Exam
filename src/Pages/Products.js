import React,{Component} from 'react';
import {connect} from 'react-redux';
// import axios from 'axios';
// import{API_URL} from '../Support/API_URL';
import {fetchProduct} from '../Redux/Action'
import {Link} from 'react-router-dom'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ProductsCard from '../Components/ProductsCard'

class Products extends Component {
    state = { 
        data : []
     }

componentDidMount(){
    this.props.fetchProduct()
    // axios.get(`${API_URL}/products`)
    // .then((res)=>{
    //     // console.log(res.data)
    //     this.setState({
    //         data : res.data
    //     })
    //     console.log(this.state.data)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
}

renderProductsCard = () =>{
    var jsx = this.props.products.map((val)=>{
        return(
            <div key={val.id}>
            <Link to={`/product-detail?id=${val.id}`}>
            <ProductsCard
                name={val.name}
                image={val.image}
                price={val.price}
                brand={val.brand}
            />
             </Link>
             </div>
        )
    })
    return jsx
}

    render() { 
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
        return ( 
            <div className='d-flex'>
            <div className='col-2'>
            </div>
            <div className='col-10'>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
            {this.renderProductsCard()}
            </div>
            </div>
            </div>
         );
    }
}

const mapStateToProps = (state)=>{
    return{
        products: state.products.productList,
        loading: state.products.loading,
        error: state.products.error
    }
}

export default connect(mapStateToProps,{fetchProduct}) (Products);