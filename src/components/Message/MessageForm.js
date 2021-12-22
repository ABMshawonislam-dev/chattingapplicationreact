import React, { Component } from 'react'
import { Input,Button,Message } from 'semantic-ui-react'
import {getDatabase, ref, set,push,onValue,child } from "../../firebase"
// import Emoji from './Emoji'
export default class MessageForm extends Component {
    state={
        msg: "",
        err: ""
    }


    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleMsgSubmit = ()=>{
        // console.log(this.props.userId)
        if (this.state.msg){

            const db = getDatabase();
                const groupRef = ref(db, 'messages');
                const newGroup = push(child(groupRef, `${this.props.groupId.id}`));
                set(newGroup, {
                    msg: this.state.msg,
                    date: Date(),
                    sender: this.props.userId.uid,
                    group:this.props.groupId.id,
                    username: this.props.userId.displayName
            }).then(()=>{
                console.log("msg gece databas e")
            })


            this.setState({err: ""})
        }else{
            this.setState({err: "Add a Message"})
        }
    }

    render() {
        return (
            <div>
                <Input name="msg" onChange={this.handleChange} style={{width:"100%",marginBottom:"20px"}} placeholder='Aa' />
                {this.state.err
                ?
                
                <Message negative>
                    <Message.Header>{this.state.err}</Message.Header>
                </Message>

                :
                ""
            }
            {/* <Emoji /> */}
                <Button onClick={this.handleMsgSubmit} style={{width:"49%"}} primary>Add Message</Button>
                <Button style={{width:"49%"}} secondary>Add Media</Button>
            </div>
        )
    }
}
