import React, { Component } from 'react'
import { Segment,Comment } from 'semantic-ui-react'
import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'
export default class Message extends Component {
   


    render() {

        
        return (
            <div>
                <Segment>

                <MessageHeader/>
                </Segment>
                <Segment style={{height:"500px",overflowY:"scroll"}}>
                    <Comment.Group>

                    </Comment.Group>

                    
                </Segment>
                <Segment>
                 <MessageForm userId={this.props.userId} groupId={this.props.groupId}/>
                </Segment>

            </div>
        )
    }
}
