import React from 'react';
import cookie from 'react-cookies';
import { Button,Modal } from 'react-materialize';

//importing developer made components//
import SingleItem from './SingleItem';
import Form from './Form';
//importing ends//

class Items extends React.Component{
    constructor(){
        super();
        this.state={cookies:[],formRender:false,searchName:'',orderPriority:'2'};

        this.search=React.createRef();
        this.order=React.createRef();

        this.createTask=this.createTask.bind(this);
        this.deleteTask=this.deleteTask.bind(this);
        this.updateTask=this.updateTask.bind(this);
        this.searchData=this.searchData.bind(this);
        this.orderBy=this.orderBy.bind(this);
    }

    updateTask(info,id){
        console.log(id);
        let data=this.state.cookies.map(i=>{
            if(i.serialNumber===id){
                i.Title=info.Title;
                i.Description=info.Description;
                i.Priority=info.Priority;
                i.Date=new Date();
            }
            return i;
        });
        cookie.save('tasks',data,{path:'/'});
        data=cookie.load('tasks'); 
        this.setState({cookies:data});

    }

    deleteTask(id,Title){
        console.log(id);
        let data=[];
        if (window.confirm("Are you sure you want to delete this message "+Title)){
            data=this.state.cookies.filter(i=>{
                if(i.serialNumber !== id)
                    return i;
            })
            cookie.save('tasks',data);
            data=cookie.load('tasks');
            this.setState({cookies:data});
        }
            else
                console.log("no");
    }

    createTask(info){
        console.log(info);
        let data=this.state.cookies;
        console.log(data);
        info.serialNumber=Date.now();
        if(data === undefined)
            data=[];
        data.push(info);
        cookie.save('tasks',data,{path:'/'});
        data=cookie.load('tasks');
        this.setState({cookies:data});
        console.log(cookie.load('tasks'))
    }

    searchData(){
        this.setState({searchName:this.search.current.value});
    }

    orderBy(){
        this.setState({orderPriority:this.order.current.value});
    }

    componentDidMount(){
        this.setState({cookies:cookie.load('tasks')});
        // console.log(data);
    }

    render(){
        if(this.state.cookies==undefined){
            return(
                <div style={{textAlign:'center'}}>
                    <h1 style={{textAlign:"center"}}>No data to show</h1>
                    <Modal header="Modal Header" trigger={<Button>Create Task</Button>}>
                           <Form create={this.createTask}/>
                    </Modal>
                </div>
            );
        }
        else{
            let data1=this.state.cookies;
            if(this.state.searchName!==''){
                data1=this.state.cookies.filter(i=>{
                    if(i.Title === this.state.searchName)
                        return i;
                })
            }
            console.log(data1);
            if(this.state.orderPriority==='1'){
                let x1=[];
                data1.forEach(i=>{
                    if(i.Priority==='1')
                        x1.push(i);
                })
                data1.forEach(i=>{
                    if(i.Priority==='2')
                        x1.push(i);
                })
                data1.forEach(i=>{
                    if(i.Priority==='3')
                        x1.push(i);
                })
                data1=x1;
            }
            else{
                let x1=[];
                data1.forEach(i=>{
                    if(i.Priority==='3')
                        x1.push(i);
                })
                data1.forEach(i=>{
                    if(i.Priority==='2')
                        x1.push(i);
                })
                data1.forEach(i=>{
                    if(i.Priority==='1')
                        x1.push(i);
                })
                data1=x1;
            }
            
            let data2=data1.map(i=>{
                return(
                    <div>
                        <SingleItem style={{display:'inline-block'}} data={i} 
                            delete={this.deleteTask}
                            update={this.updateTask}
                        />
                    </div>
                )
            })
            return(
                <div style={{textAlign:'center'}}>
                    <div style={{textAlign:'center',border:'1px solid black',width:'39%',padding:'0.5% 5%',margin:'1em 5%',marginLeft:'32%'}}>
                        {data2}
                    </div><br/>
                    <Modal header="Update" trigger={<Button>Create Task</Button>}>
                           <Form create={this.createTask}/>
                    </Modal>
                    <div style={{textAlign:'center',width:'39%',margin:'0.2% 5%',marginLeft:'32%'}}>
                        <input ref={this.search} type='text' placeholder="Search"/><button onClick={this.searchData}>Search</button>
                    <br/><h6>Order By</h6>
                    <select ref={this.order} style={{display:'inline'}} onClick={this.orderBy}>
                        <option value="1">Low-High</option>
                        <option value="2">High-Low</option>
                    </select>
                    </div>
                    
                </div>
            );
        }
    }
}


export default Items;