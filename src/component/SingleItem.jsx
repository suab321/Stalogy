import React from 'react';
import {Modal,Table,Button,Checkbox} from 'react-materialize';

//developer made module//
import Form from './Form'
//developer made module

class SingleItem extends React.Component{
    constructor(props){
        super(props);
        this.state={Priority:'Low'}
        // console.log(this.props.data);
    }
    componentDidMount(){
        console.log(this.props.data);
        if(this.props.data.Priority === "2")
            this.setState({Priority:'Medium'});
        else if(this.props.data.Priority === "3")
            this.setState({Priority:'High'});
    }


    render(){
        return(
            <div>
               <Table>
                    <tbody>
                    <tr>
                    <td>
                    {this.props.data.Title}
                    </td>
                    <td>
                    <Modal style={{textAlign:'center'}} trigger={<Button>More Options</Button>}>
                        <h5>Description</h5>
                        <p style={{color:"green"}}>
                            {this.props.data.Description}
                        </p>
                        <h6>Priority</h6>
                        <p style={{color:'red'}}>
                            {this.state.Priority}
                        </p>
                        <h6>Last Modified</h6>
                        <p>
                            {this.props.data.Date}
                        </p>
                        <Checkbox onChange={()=>{this.props.delete(this.props.data.serialNumber,this.props.data.Title)}} label="Delete"/>
                        <br/><br/>
                        <Modal header="Update Your" trigger={<Button>Update your Items</Button>}>
                           <Form data={this.props.data} update={this.props.update}/>
                        </Modal>
                    </Modal>
                    </td>
                    </tr>
                    </tbody>
                    </Table>
                   
            </div>
        )
    }
}
export default SingleItem;