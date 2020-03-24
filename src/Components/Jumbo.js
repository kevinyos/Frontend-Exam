import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Fade from 'react-reveal/Fade'
import {Link} from 'react-router-dom'
import JumboImg from '../Support/Asset/JumboImg.png';

const Jumbo = () => {
  return (
    <div>
      <Jumbotron style={{backgroundImage:'linear-gradient(to right,#cc9900,#ffd966, #ffd966, #ffffff)',height:'800%'}}>
      <div style={{display:'flex', justifyContent:'space-araound', alignItems:'center'}}>
      <div>
      <Fade bottom>
      <div>
        <h1 className="display-3">Get It Fast</h1>
        </div>
        <div>
        <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div>
        <p className="lead">
        <Link to='/products'>
          <Button style={{backgroundColor:'#4d3d00'}}>Shop Now</Button>
        </Link>
        </p>
        </div>
        </Fade>
        </div>
        <div>
          <img src={JumboImg} style={{height:'17em'}} />
        </div>
        </div>
      </Jumbotron>
    </div>
  );
};

export default Jumbo;
