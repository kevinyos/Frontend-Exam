import React,{Component} from 'react'
import {Table, Button} from 'reactstrap'
import {connect} from 'react-redux'
import {cartProduct,fetchProduct,Login, deleteCartProduct,checkout} from '../Redux/Action'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

class Cart extends Component {
    state = { 
        loading:true,
        grandTotal : 0
     }

    componentDidMount(){
        this.props.cartProduct(this.props.userID)
    }

    componentDidUpdate(){
        if(this.props.userID && this.state.loading){
            this.props.cartProduct(this.props.userID)
            this.setState({
                loading:false
            })
        }
    }

    onBtnDelete = (id,img) =>{
        this.props.deleteCartProduct(id,img)
    }

    renderTableCart = () =>{
        let nomor =1
        return this.props.cart.map((val)=>{
            return(
                <tr key={val.id}>
                    <td>{`${nomor++}`}</td>
                    <td><img src={val.image}  alt={val.name} height='25%'/></td>
                    <td>{val.name}</td>
                    <td>{val.size}</td>
                    <td>Rp.{val.price},-</td>
                    <td><Button onClick={()=>this.onBtnQtyMinus(val.id,val.qty,val.image,val.name,val.size,val.price,val.total,val.userID,val.productID)}>-</Button> {val.qty} <Button onClick={()=>this.onBtnQtyPlus(val.id,val.qty,val.image,val.name,val.size,val.price,val.total,val.userID,val.productID)}>+</Button> </td>
                    <td>Rp.{val.total =val.qty * val.price},-</td>
                    <td><Button color='danger' onClick={()=>{this.onBtnDelete(val.id,val.image)}}>Delete</Button></td>
                </tr>
        )
       })
      
    }
    
    onBtnQtyPlus = (id,qty,image,name,size,price,total,userID,productID) =>{
        let obj={
            id:id,
            image:image,
            name:name,
            size:size,
            price:price,
            total:total,
            productID:productID,
            userID:userID,
            qty: qty + 1
        }
        this.setState({
            loading:true
        })
        Axios.patch(`${API_URL}/cart/${id}`,obj)
        .then((res)=>{
            this.props.cartProduct(this.props.userID)
        })
        .catch((err)=>{
            console.log(err)
        })
        // console.log(obj)
    }

    onBtnQtyMinus = (id,qty,image,name,size,price,total,userID,productID) =>{
        let obj={
            id:id,
            image:image,
            name:name,
            size:size,
            price:price,
            total:total,
            productID:productID,
            userID:userID,
            qty: qty - 1
        }
        this.setState({
            loading:true
        })
        Axios.patch(`${API_URL}/cart/${id}`,obj)
        .then((res)=>{
            this.props.cartProduct(this.props.userID)
        })
        .catch((err)=>{
            console.log(err)
        })
        // console.log(obj)
    }


     renderTfoot = () =>{
         let pQty = []
         let pPrice =[]
         let buff = 0
         let total = 0
        this.props.cart.map((val)=>{
            pQty.push(val.qty)
            pPrice.push(val.price)
        })
        for( var i=0;i<pQty.length;i++){
            buff=pQty[i]*pPrice[i]
            total += buff
        }
        return total
        // this.props.cart.forEach(val=>{
        //     this.setState(prevState=>{
        //         return{
        //             grandTotal:prevState.grandTotal +(val.price*val.qty)
        //         }
        //     })
        // })
        // console.log(pQty,pPrice,total)
    }
    
    addToCheckOut = () =>{
        let date = new Date().getDate()
        let month = new Date().getMonth()+1
        let year = new Date().getFullYear()

        let {cart} = this.props
        let currentDate = date+'/'+month+'/'+year
        let sum = () =>{
            let pQty = []
            let pPrice =[]
            let buff = 0
            let total = 0
           this.props.cart.map((val)=>{
               pQty.push(val.qty)
               pPrice.push(val.price)
           })
           for( var i=0;i<pQty.length;i++){
               buff=pQty[i]*pPrice[i]
               total += buff
           }
           return total
        }
        let grandtotal = sum()
        let obj = {
            date:currentDate,
            grandtotal,
            product: cart
        }
        console.log(obj)
        this.props.checkout(obj)

    }

    render() {
        //   console.log(this.renderTfoot())
        return (
            <div>
            <div className='row' style={{display:'flex',alignContent:'center', justifyContent:'center'}} >
            <div className='col-10' >
            <Table style={{textAlign:'center'}}>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>qty</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

                {this.renderTableCart()}
                

                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Rp.{this.renderTfoot()},-</td>
                    <td><Button onClick={()=>this.addToCheckOut()}>Check Out</Button></td>
                </tr>
                </tfoot>
            </Table>
            </div>
            </div>
       
          
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        cart:state.cart.cartList,
        userID:state.auth.id,
        data:state.products.productID,
    }
}

export default connect(mapStateToProps,{deleteCartProduct,Login,cartProduct,fetchProduct,checkout}) (Cart);