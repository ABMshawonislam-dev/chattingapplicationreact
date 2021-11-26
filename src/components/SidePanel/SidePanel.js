import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel'
export default class SidePanel extends Component {
    render() {
        return (
            <Menu size="large" fixed="left" vertical style={{background: "#5353C2"}}>
                <UserPanel></UserPanel>
            </Menu>
        )
    }
}
