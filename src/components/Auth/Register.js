import React, { Component } from 'react'
import { Grid,Form,Segment,Button,Header,Message,Icon } from 'semantic-ui-react'

export default class Register extends Component {
    render() {
        return (
            <Grid textAlign="center" verticalAlign="center">
                <Grid.Column style={{maxWidth: 500}}>
                <Header as='h1' icon textAlign="center" style={{color: "#0040FE"}}>
                    <Icon name="group"/>
                    Let's Join MERN ADDA
                </Header>
                </Grid.Column>
            </Grid>
        )
    }
}
