import React,{Component} from 'react';

import CardHome from '../Components/CardHome'
import Jumbo from '../Components/Jumbo'
// import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

class Home extends Component {
    state = { 
        dataCard:[
            {
                name:'Men',
                image:'https://raw.githubusercontent.com/lianeddy/ecommerce-jc12/master/src/Public/Assets/%24_10.jpg'
            },
            {
                name:'Women',
                image:'https://raw.githubusercontent.com/lianeddy/ecommerce-jc12/master/src/Public/Assets/womencat.jpg'
            },
            {
                name:'Kids',
                image:'https://raw.githubusercontent.com/lianeddy/ecommerce-jc12/master/src/Public/Assets/kidscat.jpg'
            }
        ]
     }
     renderCardHome=()=>{
        let { dataCard } = this.state;
        return dataCard.map((val) => {
          return(
            <div className='col-4'>
              <CardHome
                image={val.image}
                name={val.name}
              />
            </div>
          )
        })
     }
    render() { 
        return (
            <div>
                <Jumbo />
                <div style={{display:'flex', margin:'0 auto'}}> 
                {this.renderCardHome()}
                </div>
            </div>
         );
    }
}
 
export default Home;