import React, { Component } from 'react'
import { Header,Icon,Modal,Button,Form } from 'semantic-ui-react'
export default class Groups extends Component {
    state={
        groups: [],
        modal: false,
        groupname: "",
        grouptagline: ""
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
    render() {
        return (
            <>
            
                <Header style={{color:"#fff",marginTop: 30,marginLeft:20}}>
                     Groups ({this.state.groups.length})
                     <Icon onClick={this.openModal}  name="add square" style={{display:"inline-block",marginLeft:83}}></Icon>
                </Header>

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
                        <Form>
                            <Form.Field>
                            <label style={{color: "#fff"}}>Group Name</label>
                            <input onChange={this.handleChange} name="groupname" placeholder='Group Name' />
                            </Form.Field>
                            <Form.Field>
                            <label style={{color: "#fff"}}>Group Tagline</label>
                            <input onChange={this.handleChange} name="grouptagline" placeholder='Group Tagline' />
                            </Form.Field>
                        </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' inverted >
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
