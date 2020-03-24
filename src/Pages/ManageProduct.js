import React, {Component} from 'react'
import {Table, Button, Input} from 'reactstrap'
import axios from 'axios';
import {API_URL} from '../Support/API_URL'
import {connect} from 'react-redux'
import {fetchProduct,editProducts,deleteProduct,addProduct} from '../Redux/Action'

import {Login} from '../Redux/Action'
import Swal from 'sweetalert2'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Redirect } from 'react-router-dom'


class ManageProduct extends Component {
    state = {
        selectedID:null
      }

    componentDidMount(){
        this.props.fetchProduct()
    }

    fetch(){
        this.props.fetchProduct()
    }

    renderTable = () =>{
        // axios.get(`${API_URL}/users?id=${this.state.id}`)
        // .then((res)=>{
        //     let role = res.data
        // console.log(role)
        // if(role===2){
        return this.props.products.map((val)=>{
            if(val.id===this.state.selectedID){
                return(
                    <tr>
                        <td>{val.id}</td>
                        <td><Input defaultValue={val.name} innerRef={(editName)=>this.editName=editName}></Input></td>
                        <td><Input defaultValue={val.brand} innerRef={(editBrand)=>this.editBrand=editBrand}></Input></td>
                        <td><Input defaultValue={val.price} innerRef={(editPrice)=>this.editPrice=editPrice}></Input></td>
                        <td><Input defaultValue={val.category} innerRef={(editCategory)=>this.editCategory=editCategory}></Input></td>
                        <td><Input defaultValue={val.image} innerRef={(editImage)=>this.editImage=editImage}></Input></td>
                        <td><Button color='danger' onClick={()=>this.setState({selectedID:null})}>Cancel</Button></td>
                        <td><Button color='success' onClick={()=>this.confirmEdit(val.id)}>Save</Button></td>
                    </tr>
                )
            }
            return(
                <tr style={{fontWeight:'bold'}}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.brand}</td>
                    {/* <td>{val.price.toLocaleString()}</td> */}
                    <td>{val.category}</td>
                    <td><img src={val.image}  alt={val.name} height='50%'/></td>
                    <td><Button color='info' onClick={()=>this.selectedID(val.id)}>Edit</Button></td>
                    <td><Button color ='warning' onClick={()=>this.btnDelete(val.id,val.image)}>Delete</Button></td>
                </tr>
            )
        })}
    //     else{
    //         return(
    //             window.alert('No permission')
    //             // <Redirect to='/'/>
    //         )
    //     }
        
    // }).catch((err)=>{
    //         console.log(err)
    //     })}

    btnDelete=(id,image)=>{
        this.props.deleteProduct(id,image)
    
    }


    selectedID = (id) => {
        this.setState({ //function untuk mengganti setstate id, //?di button kenapa pake function call back karena terima parameter id dengan funtion tersebut
            selectedID:id
        })
    }

    confirmEdit = (id) =>{
        let name = this.editName.value; 
        let brand = this.editBrand.value;
        let price = parseInt(this.editPrice.value);
        let category = this.editCategory.value;
        let image = this.editImage.value;
        let obj={
            name,
            brand,
            price,
            category,
            image
        }
        // console.log(name,brand,price,category,image)
            this.props.editProducts(id,obj)
          
          
            this.setState({
                selectedID:null
            })
          
        
    }

    addProduct = () =>{
       
        let name = this.name.value;
        let brand = this.brand.value;
        let price =  parseInt(this.price.value);
        let category = this.category.value;
        let image = this.image.value;
        // console.log(name,brand,price,category,image)
        let productData = {
            name,
            brand,
            price,
            category,
            image //nama properti sama dengan nama variabel yang mau di isi properti:variabel
        }
       
        if(this.name.value==='' && this.price.value===''){
            Swal.fire(
                'Fill the text',
                'You havent fill the te name and price!',
                'warning'
              )
        }else{
            this.props.addProduct(productData)

        }
        
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
            <div>
                <Table hover responsive>
                <center>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th colSpan='2'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderTable()}
                    </tbody>

                    <tfoot>
                    <tr>
                        <td></td>
                        <td><Input placeholder='Name' innerRef={(name)=>this.name=name}></Input></td>
                        <td><Input placeholder='Brand' innerRef={(brand)=>this.brand=brand}></Input></td>
                        <td><Input type='number' placeholder='Price' innerRef={(price)=>this.price=price}></Input></td>
                        <td>
                            <Input type='select' innerRef={(category)=>this.category=category} >
                                <option value='Men'>Men</option>
                                <option value='Women'>Women</option>
                                <option value='Kids'>Kids</option>
                            </Input>
                        </td>
                        <td><Input placeholder='Image' innerRef={(image)=>this.image=image}></Input></td>
                        <td><Button onClick={this.addProduct}>Add Product</Button></td>
                    </tr>
                    </tfoot>
                    </center>
                </Table>
            </div>
         );
    }
}
const mapStateToProps = (state) =>{
    return{
        products: state.products.productList,
        loading: state.products.loading,
        error: state.products.error,
        id: state.auth.id
    }
}
 
export default connect(mapStateToProps,{addProduct,fetchProduct,editProducts,deleteProduct}) (ManageProduct);