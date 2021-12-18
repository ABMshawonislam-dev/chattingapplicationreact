import React, { Component } from 'react'
import { Segment,Comment } from 'semantic-ui-react'
import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'

import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved } from "../../firebase";

export default class Message extends Component {
   state={
       groupmsg:[]
   }
    componentDidUpdate(previousProps){
        let msgarr=[]
        const db = getDatabase();
        const commentsRef = ref(db, 'messages/' + this.props.groupId.id);
        onChildAdded(commentsRef, (data) => {
            data.forEach(item=>{
                msgarr.push(item.val())
            })
            if(previousProps.groupId){
                if(previousProps.groupId.groupname !== this.props.groupId.groupname){
                    this.setState({groupmsg:msgarr})
                    console.log(this.state.groupmsg)
                }
               
            }else{
                this.setState({groupmsg:msgarr})
                console.log(msgarr)
            }
    
        });
        onChildChanged(commentsRef, (data) => {
            msgarr =[]
            data.forEach(item=>{
                msgarr.push(item.val())
            })
            if(previousProps.groupId){
                if(previousProps.groupId.groupname !== this.props.groupId.groupname){
                    this.setState({groupmsg:msgarr})
                    console.log(this.state.groupmsg)
                }
               
            }else{
                this.setState({groupmsg:msgarr})
                
            }
    
        });

        


        
    }

    
   
    render() {
       
        return (
            <div>
                <Segment>

                <MessageHeader/>
                </Segment>
                <Segment style={{height:"500px",overflowY:"scroll"}}>
                    <Comment.Group>
                        {this.state.groupmsg.map((item)=>(
                           <>
                            <span>{item.date}</span>
                            <h1 style={this.props.userId.uid==item.sender?center:left}>{item.msg}</h1>
                           </>
                            
                        ))}
                    </Comment.Group>

                    
                </Segment>
                <Segment>
                 <MessageForm userId={this.props.userId} groupId={this.props.groupId}/>
                </Segment>

            </div>
        )
    }
}

const center = {
    textAlign: "right"
}
const left = {
    textAlign: "left"
}