import { Component } from "react";
import { getAuth } from '../firebase';
import {connect} from 'react-redux'
import {setuser,clearuser} from '../actions'
import { Dimmer, Loader, Segment,Grid } from 'semantic-ui-react'

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Message from "./Message/Message";
import MetaPanel from "./MetaPanel/MetaPanel";

class App extends Component{
  state={
    userid: ""
  }

  componentDidMount(){
    getAuth().onAuthStateChanged((user)=>{
      if(user){
        this.props.setuser(user)
      }else{
        this.props.clearuser()
      }
     
    })
    
  }
  render(){
    
  return this.props.isLoading ? 
  (
    <Segment style={{height: "100vh"}}>
      <Dimmer active>
        <Loader >Loading</Loader>
      </Dimmer>
    </Segment>
  )
    :
    (
    <>
      <Grid colums="equal" className="app">
      <Grid.Column style={{width:"4%"}}>
        <ColorPanel></ColorPanel>

      </Grid.Column>

      <Grid.Column style={{width:"20%"}}>
        <SidePanel userName={this.props.userName.displayName} user={this.props.userName}></SidePanel>

      </Grid.Column>

        <Grid.Column style={{width:"40%"}}>
          <Message userId={this.props.userName} groupId={this.props.groupId}></Message>
        </Grid.Column>

        <Grid.Column style={{width:"36%"}}>
          <MetaPanel></MetaPanel>
        </Grid.Column>
      
      </Grid>
    </>
   );

 }
}

const mapStateToProps = (state)=>({
  isLoading: state.user.isLoading,
  userName: state.user.currentUser,
  groupId : state.group.currentGroup
})

export default connect(mapStateToProps, { setuser,clearuser })(App);
