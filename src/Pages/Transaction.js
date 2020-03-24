import React, {Component} from 'react'
import { connect } from 'react-redux';
// import {fetchTransaction} from '../Redux/Action'
import Axios from 'axios'
import { API_URL }  from '../Support/API_URL'
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


class Transaction extends Component {
    state = { 
        loading:true,
        data: [],
        showModal: false,
        renderModal : []
     }

    componentDidMount(){

        let token = localStorage.getItem('token')
        let userInfo = JSON.parse(token)
        this.fetchTransaction(userInfo.id)
        // this.setState({
        //     condition:true
        // })
    }

    fetchTransaction = (id) => {
        Axios.get(`${API_URL}/transaction?userId=${id}`)
        .then(res => {
            this.setState({
                data: res.data,
            })
            console.log('componentmount jalan!')
            console.log(this.state.data[0].product)
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleClick = (id) => {
        console.log(id)
        this.transDetail(id)
        this.setState({
            showModal: true
        })
    }

    renderTableTransaction = () =>{
        let nomor=1

        // let productDetail = this.state.data.product.map(val =>{
        //     return (
        //         <p>val.name</p>
        //     )
        // })

        return this.state.data.map((val,id)=>{
            return(
                <tr key={val.id}>
                    <td>{`${nomor++}`}</td>
                    <td>{val.date}</td>
                    <td>{val.product.slice(0,1).map((val)=>{
                        return <img src={val.image} width='20%'/>
                    })}</td>
                    <td>
                    {val.product.slice(0,1).map(val =>{
                        return <p>{val.name}</p>
                    })}
                    </td>
                    <td>{val.grandtotal}</td>
                    <td><Button onClick={()=> this.handleClick(id)}>Transaction Details</Button></td>
                </tr>
            )
          })
    }
    
   
    transDetail = (id) => {
        let no = 1
        let arr = this.state.data[id].product.map(val =>{
            return(
                <tr>
                    <td>{no++}</td>
                    <td><img width='20%' src={val.image} /></td>
                    <td>{val.name}</td>
                    <td>{val.size}</td>
                    <td>{val.price}</td>
                    <td>{val.qty}</td>
                    <td>{val.total}</td>
                </tr>
            )
        })
        this.setState({
            renderModal: arr
        })
    }
    


    render() {
        return (
            <div>
                

                <div>
                    <Table>
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Date</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableTransaction()}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Modal isOpen={this.state.showModal}>
                    <ModalHeader>Transaction Detail</ModalHeader>
                    <ModalBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.renderModal}
                        </tbody>
                    </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.setState({ showModal: false })}>Close</Button>
                    </ModalFooter>
                    </Modal>
                </div>
            </div>
         );
    }
}

const mapStateToProps = (state)=>{
    return{
        transaction:state.transactions.transactionList,
        userID:state.auth.id,
        cart:state.cart.cartList,
    }
}

export default connect (mapStateToProps) (Transaction);