import React, { Component } from 'react'
import { Grid,Form,Segment,Button,Header,Message,Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword } from '../../firebase'
export default class Login extends Component {
    state={
        email: "",
        password: "",
        errorMsg: "",
        loader: false
    }

    handeleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})

    }


    isFormEmty = ({email,password}) => {
        if(!email.length || !password.length){
            this.setState({errorMsg: "Fill The All Field"})
        }else if(password.length < 8){
            this.setState({errorMsg: "Password should be greater than 8"})
        }else{
            return true
        }
    }

    
    handleSubmit = (e)=>{
        e.preventDefault()

        if(this.isFormEmty(this.state)){
            this.setState({loader: true})
            signInWithEmailAndPassword(getAuth(), this.state.email, this.state.password)
            .then((userCredential)=>{
                console.log(userCredential)
                this.setState({loader: false})
            }) .catch((error) => {
                this.setState({loader: false})
                const errorCode = error.code;
                if(errorCode.includes("user")){
                    this.setState({errorMsg: "Email Not Matched"})
                }else if(errorCode.includes("wrong-password")){
                    this.setState({errorMsg: "Wrong Password"})

                }
                
              });

            
        }

    }

    render() {
        const {email,password,errorMsg,loader} = this.state
        return (
            <Grid textAlign="center" verticalAlign="center" style={{marginTop:"100px"}}>
                <Grid.Column style={{maxWidth: 500}}>
                <Header as='h1' icon textAlign="center" color="blue">
                    <Icon name="linkify"/>
                    Let's Start MERN ADDA
                </Header>
                <Segment stacked>
                {/* error msg start */}

                    {errorMsg ? <Message error>
                    <Message.Header>{errorMsg}</Message.Header>
                </Message>: ""}

                {/* error msg end */}


                <Form onSubmit={this.handleSubmit}>
                   
                    <Form.Field className={errorMsg.includes("Email") ? "error" : ""}>
                    <label style={{textAlign:  "left"}}> <Icon name="mail"/>E-mail</label>
                    <input name="email" placeholder='Your E-mail' type="email" onChange={this.handeleChange} value={email}/>
                    </Form.Field>
                    <Form.Field className={errorMsg.includes("Password") ? "error" : ""}>
                    <label style={{textAlign:  "left"}}><Icon name="lock"/>Password</label>
                    <input name="password" placeholder='Your Password' type="password" onChange={this.handeleChange} value={password}/>
                    </Form.Field>
                    <Button className={loader ? 'loading primary disabled' : ''} color="blue" type='submit'>Submit</Button>
                </Form>
               
                </Segment>
                <Message>
                    <Message.Header>Don't Have An Account? <Link to="/register">Sigup</Link> </Message.Header>
                </Message>
                </Grid.Column>
            </Grid>
        )
    }
}
