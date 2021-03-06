import React, { Component } from 'react'
import { Segment,Header,Icon,Input } from 'semantic-ui-react'
export default class MessageHeader extends Component {
    render() {
        return (
             
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <Header as="h2">
                            Group
                            <Icon name="star outline" color='black'/>
                            <Header as="h5">5 Users</Header>
                        </Header>
                        <div><Input onChange={this.props.handleSearchChange} size="mini" icon="search" name="searchmessage" placeholder="search message"/></div>
                        </div>

                
        )
    }
}
