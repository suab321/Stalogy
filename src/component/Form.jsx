import React from 'react';

class Form extends React.Component{
    constructor(props){
        super(props);

        this.state={
            buttonName:'create'
        }

        this.title=React.createRef();
        this.description=React.createRef();
        this.priority=React.createRef();

        this.create=this.create.bind(this);
    }

    create(){
        // console.log(this.title.current.value);
        // console.log(this.description.current.value);
        // console.log(this.priority.current.value);
        const info={
            Title:this.title.current.value,
            Description:this.description.current.value,
            Priority:this.priority.current.value,
            Date:new Date()
        };
        this.title.current.value="";
        this.description.current.value="";
        this.priority.current.value="";

        if(this.state.buttonName=="create")
            this.props.create(info);
        else
            this.props.update(info,this.props.data.serialNumber);
    }

    componentDidMount(){
       
        if(this.props.data!==undefined){
            // console.log(this.props.data.serialNumber)
            this.title.current.value=this.props.data.Title;
            this.description.current.value=this.props.data.Description;
            this.setState({buttonName:'Update'})
        }
    }


    render(){
        return(
            <div>
                <div style={{textAlign:"center"}}>
				<div class='form'>
				<label style={{fontSize: "2em"}}>CREATE TASK</label><br/><br/><br/>
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdLlL2Ebb5odyDgvmLj33TXvrYUb-Psspq1137g1WNIjgRo_RKgA" alt="" width="200px" height="200px"/><br/><br/>
				<label>TITLE</label><br/><br/>
				<input ref={this.title} /><br/><br/>
                <label>DESCRIPTION</label><br/><br/>
				<input ref={this.description}/><br/>
                <label>Priority</label><br/>
                <select ref={this.priority}style={{display:'inline'}}>
                    <option value="3">High</option>
                    <option value="2">Medium</option>
                    <option value="1">Low</option>
                </select><br/>
				<button style={{cursor: "pointer",fontSize: "1em"}}onClick={this.create}>{this.state.buttonName}</button><br/><br/>
				</div>
			</div>

            </div>
        )
    }
}
export default Form;