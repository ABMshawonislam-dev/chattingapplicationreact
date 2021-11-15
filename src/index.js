import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import { getAuth } from './firebase';
import 'semantic-ui-css/semantic.min.css'



class Routing extends Component{
  state={
    tracker: false
  }
  componentDidMount(){
    getAuth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({tracker: true})
      }else{
        this.setState({tracker: false})
      }
    })
  }
  render(){
    return(
      <Router>
        {this.state.tracker ? 
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/register" element={<Navigate to="/" />}></Route>
            <Route path="/login" element={<Navigate to="/" />}></Route>
        </Routes>
          
        
        :
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
        
        }
      
    </Router>
    )
  }
}

ReactDOM.render(<Routing />,document.getElementById('root'));
