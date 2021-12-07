import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setcurrentgroup } from '../../actions'
import { Header,Icon,Modal,Button,Form,Message,Menu } from 'semantic-ui-react'
import {getDatabase, ref, set,push,onValue } from "../../firebase"


 class Groups extends Component {
    state={
        groups: [],
        modal: false,
        groupname: "",
        grouptagline: "",
        err: ""
    }

    openModal = ()=>{
        this.setState({modal: true})
    }
    closeModal = ()=>{
        this.setState({modal: false})
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit= (e)=>{
        e.preventDefault()

        if(this.isFormValid(this.state)){
            const db = getDatabase();
                const groupRef = ref(db, 'groups');
                const newGroup = push(groupRef);
                set(newGroup, {
                    groupname: this.state.groupname,
                    grouptagline: this.state.grouptagline,
                    createdby: this.props.userName
            }).then(()=>{
                this.setState({modal: false})
                this.setState({groupname: ""})
                this.setState({grouptagline: ""})
                this.setState({gerr: ""})
            })


           
        }else{
            this.setState({err: "Please Fill The Information Box"})
        }
     
    }


    isFormValid = ({groupname,grouptagline})=>{
        if(groupname && grouptagline){
            return true
        }else{
            return false
        }
    }

    componentDidMount(){
        let groupsafterload =[]
        const db = getDatabase();
        const groupRef = ref(db, 'groups');
        onValue(groupRef, (snapshot) => {
                snapshot.forEach(item=>{
                    console.log(item.key)
                    let groupdata = {
                        id: item.key,
                        groupname: item.val().groupname,
                        grouptagline: item.val().grouptagline,
                        createdby: item.val().createdby

                    }
                    groupsafterload.push(groupdata)
                })
                
                this.setState({groups:groupsafterload})
        });
    }

    groupChange = (group)=>{
        this.props.setcurrentgroup(group)
    }

    render() {
        return (
            <>
            
                <Header style={{color:"#fff",marginTop: 30,marginLeft:20}}>
                     Groups ({this.state.groups.length})
                     <Icon onClick={this.openModal}  name="add square" style={{display:"inline-block",marginLeft:83}}></Icon> 
                </Header>


                     <Menu text vertical style={{color:"#fff",marginTop: 30,marginLeft:20}}>
                         {this.state.groups.map((item)=>(
                            
                             <Menu.Item onClick={()=>this.groupChange(item)} style={{color:"#fff",fontSize:"16px"}}>{item.groupname}</Menu.Item>
                      

                         ))}
                       
                    </Menu>     

                <Modal
                        basic
                        open={this.state.modal}
                        size='small'
                        >
                        <Header icon>
                            <Icon name='group' />
                            Add Group Details
                        </Header>
                        <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                            <label style={{color: "#fff"}}>Group Name</label>
                            <input onChange={this.handleChange} name="groupname" placeholder='Group Name' />
                            </Form.Field>
                            <Form.Field>
                            <label style={{color: "#fff"}}>Group Tagline</label>
                            <input onChange={this.handleChange} name="grouptagline" placeholder='Group Tagline' />
                            </Form.Field>
                        </Form>
                        {this.state.err ? <Message negative>
                            <Message.Header>{this.state.err}</Message.Header>
                        </Message>: ""}
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' inverted  onClick={this.handleSubmit}>
                            <Icon name='checkmark' /> Add Group
                            </Button>
                            <Button basic color='red' inverted onClick={this.closeModal}>
                            <Icon name='remove' /> Cancel
                            </Button>
                        </Modal.Actions>
                    </Modal>
            </>
        )
    }
}


export default connect(null,{setcurrentgroup})(Groups)