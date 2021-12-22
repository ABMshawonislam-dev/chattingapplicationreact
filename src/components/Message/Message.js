import React, { Component } from 'react'
import { Segment,Comment } from 'semantic-ui-react'
import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'
import moment from 'moment'
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved } from "../../firebase";

export default class Message extends Component {
   state={
       groupmsg:[]
   }
    componentDidUpdate(previousProps){
        let msgarr=[]
        const db = getDatabase();
        const commentsRef = ref(db, 'messages/');
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
                           
                           item.group == this.props.groupId.id?
                           <Comment style={this.props.userId.uid==item.sender?center:left}>
                                <Comment.Content>
                                    <Comment.Author as='a'>{item.username}</Comment.Author>
                                    <Comment.Metadata>
                                    <div>{moment(item.date).fromNow()}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{item.msg}</Comment.Text>
                                    <Comment.Actions>
                                    </Comment.Actions>
                                </Comment.Content>
                             </Comment>

                        //    <>
                        //     <span>{moment(item.date).fromNow()}</span>
                        //     <h1 style={this.props.userId.uid==item.sender?center:left}>{item.msg}</h1>
                        //    </>
                            :
                            ""
                     

                            
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
    display: "flex",
    justifyContent: "flex-end",
}
const left = {
    display: "flex",
    justifyContent: "flex-start",
}