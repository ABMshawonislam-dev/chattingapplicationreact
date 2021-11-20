import { Component } from "react";
import { getAuth } from '../firebase';
import {connect} from 'react-redux'
import {setuser} from '../actions'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
class App extends Component{
  componentDidMount(){
    getAuth().onAuthStateChanged((user)=>{
      if(user){
        this.props.setuser(user)
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
    <h1>React</h1>
    </>
   );

 }
}

const mapStateToProps = (state)=>({
  isLoading: state.user.isLoading
})

export default connect(mapStateToProps, { setuser })(App);
