import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
// import { connect } from 'react-redux'

const ProductsCard = (props) => {
  return (
    <div style={{width:'220px', justifyContent:'center', textAlign:'center'}} className='m-3' >
      <Card style={{width:'230px',height:'350px'}}>
        <CardImg top width='100%' src={props.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle>{props.brand}</CardSubtitle>
          <CardText>Rp.{props.price.toLocaleString()}.-</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductsCard;
