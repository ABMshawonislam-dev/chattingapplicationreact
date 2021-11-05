import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css'

const Routing = () =>(
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
)

ReactDOM.render(<Routing />,document.getElementById('root'));
