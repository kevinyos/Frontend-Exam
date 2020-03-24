import React,{Component} from 'react';
import Axios from 'axios';
// import { InputGroup } from 'reactstrap';

class LatihanAxios extends Component {
    state = { data:[],
              idData:1,
              form :{
                  nama:'',
                  boolean:'',
                  laptop:''
              },
              count: 2        
            }

    componentDidMount(){
        // GETGETGETGETGETGETGTEGTEGT
    //     Axios.get('http://jsonplaceholder.typicode.com/posts')
    //     .then((res)=>{
    //         console.log(res)
    //         this.setState({
    //             data:res.data
    //         })
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })

        Axios.get('http://localhost:2000/latihan')
        .then((res)=>{
            console.log(res,'ini Get')
            this.setState({
                data:res.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    fetchData = () =>{
        Axios.get('http://localhost:2000/latihan')
        .then((res)=>{
            console.log(res,'ini Fetch')
            this.setState({
                data:res.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    increment = () => {
        this.setState(prevState => {
            return{
                count: prevState.count + 1 //prevstate.count = 0 / value sebelumnya
            }
        })
    }

    onBtnAddData = () =>{
        // let nama = this.refs.nama.value;
        let {nama,boolean,laptop} = this.state.form
        

        
        // Axios.post('http://localhost:2000/latihan',{nama:nama})
        Axios.post('http://localhost:2000/latihan',{nama,boolean,laptop})
        .then((res)=>{
            console.log(res,'ini Post')
            this.fetchData()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onBtnEditData = () =>{
        // let nama =this.refs.nama.value;
        // let x = this.refs.pilih.value;
        let {nama,boolean,laptop} = this.state.form
        let obj = {}
        if(nama){
            obj.nama = nama
        }
        if(boolean){
            obj.boolean = boolean
        }
        if(laptop){
            obj.laptop = laptop
        }


        // Axios.patch(`http://localhost:2000/latihan/${this.state.idData}`,{nama:nama}) //nama json : nama refs //liat idnya berapa yang mau di ganti, disinin di hardcode 1
        Axios.patch(`http://localhost:2000/latihan/${this.state.idData}`,obj) 
        .then((res)=>{
                console.log(res,'Patch')
                this.fetchData()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onBtnEditDataPut = () =>{
        let nama =this.refs.nama.value;
        // let x = this.refs.pilih.value;
        Axios.put(`http://localhost:2000/latihan/${this.state.idData}`,{nama:nama})//put itu taro properti yang lain di hapus. hanya properti yang disini aja
        .then((res)=>{
            console.log(res,'Put')
            this.fetchData()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onBtnDeleteData = () =>{
        // let x = this.refs.pilih.value;
        Axios.delete(`http://localhost:2000/latihan/${this.state.idData}`)
        .then((res)=>{
            console.log(res,'delete')
            this.fetchData()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onBtnDeleteDataAll = () =>{
        Axios.get('http://localhost:2000/latihan')
        .then((res)=>{
            // console.log(res,'ini Get')
            res.data.forEach((val)=>{
                Axios.delete(`http://localhost:2000/latihan/${val.id}`)
                    .then((res)=>{
                        console.log(res,'delete')
                        this.fetchData()
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })
           
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderData = () =>{
        return this.state.data.map((val,index)=>{
            return(
                <div key={index}>
                    <h2>{val.id}. {val.title}</h2>
                    <p>
                        {val.body} posted by User Id {val.userId}
                    </p>
                </div>
            )
        })
    }

    renderSelect = () =>{
        return this.state.data.map((val)=>{
            return(
                    // <option value={val.id}>{val.id}</option>
                    <option value={val.id} key={val.id}>{val.id}</option>
            )
        })
    }

    renderTable = () =>{
        return this.state.data.map((val)=>{
            return(
                <tr style={{border:'1px solid black'}}>
                    <td style={{border:'1px solid black'}}>{val.id}</td>
                    <td style={{border:'1px solid black'}}>{val.nama}</td>
                    <td style={{border:'1px solid black'}}>{val.boolean}</td>
                    <td style={{border:'1px solid black'}}>{val.laptop}</td>
                </tr>
            )
        })
    }

    handleChange = (e) =>{
        console.log(e.target.id)
        this.setState({
                form:{
                    ...this.state.form,
                    [e.target.id]: e.target.value
                }
            })
    }

    render() { 
        console.log(this.state.form)
        console.log(this.state.idData)
        return ( 
            <div>
            <h1>Latihan Axios</h1>
                {/* <div>{this.renderData()}</div> */}
                <div>
                <div style={{margin:'10px'}}>
                {/* <select ref='pilih' > */}
                <select onChange={ (e) => this.setState ({idData: e.target.value})}>
                       {this.renderSelect()} 
                </select>
                </div>
                <div style={{margin:'10px'}}>
                <table style={{border:'1px solid black'}}>
                    <thead>
                        <tr>
                            <th style={{border:'1px solid black'}}>Id</th>
                            <th style={{border:'1px solid black'}}>Nama</th>
                            <th style={{border:'1px solid black'}}>Boolean</th>
                            <th style={{border:'1px solid black'}}>Laptop</th>
                        </tr>
                    </thead>
                    <tbody style={{border:'1px solid black'}}>
                        {this.renderTable()}
                    </tbody>
                </table>

                </div>
                <div style={{margin:'10px'}}>
                    <input type='text' ref='nama' placeholder='nama' onChange={this.handleChange}  id='nama' />
                    <input type='text' ref='boolean' placeholder='boolean' onChange={this.handleChange} id='boolean' />
                    <input type='text' ref='laptop' placeholder='laptop' onChange={this.handleChange} id='laptop'  />
                    <input type='button' value='Add' onClick={this.onBtnAddData}/>
                    <input type='button' value='Edit' onClick={this.onBtnEditData}/>
                    <input type='button' value='EditPut' onClick={this.onBtnEditDataPut}/>
                    <input type='button' value='Delete' onClick={this.onBtnDeleteData}/>
                    <input type='button' value='DeleteAll' onClick={this.onBtnDeleteDataAll}/>
                </div>
                </div>
            </div>
         );     
    }
}
 
export default LatihanAxios;

//      <select onChange={ (e) => this.setState ({idData: e.target.value})}>
// untuk ambil value juka onchange menggunakan function e(event) funtion yang jalanin setstate untuk mengisi IdData dari value yang ada di select
// Karena setstate dia membutuhkan parameter ({idData: e.target.value})