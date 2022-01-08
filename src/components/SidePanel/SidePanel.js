import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel'
import Groups from './Groups'
import Friends from './Friends'
export default class SidePanel extends Component {
    render() {
        return (
            <Menu size="large"  vertical style={{background: "#5353C2",height:"100vh"}}>
                <UserPanel userName={this.props.userName}></UserPanel>
                <Groups userName={this.props.userName}/>
                <Friends user={this.props.user}/>
            </Menu>
        )
    }
}
