import React, { Component } from 'react'
import { Grid,Form,Segment,Button,Header,Message,Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {getAuth,createUserWithEmailAndPassword,updateProfile,getDatabase, ref, set } from "../../firebase"


export default class Register extends Component {
    state={
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMsg: "",
        successMsg: "",
        loader: false
    }

    handeleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})

    }


    isFormEmty = ({username,email,password,confirmPassword}) => {
        if(!username.length || !email.length || !password.length || !confirmPassword.length){
            this.setState({errorMsg: "Fill The All Field"})
        }else if(password.length < 8 || confirmPassword.length < 8){
            this.setState({errorMsg: "Password should be greater than 8"})
        }else if(password !== confirmPassword){
            this.setState({errorMsg: "Password does not matched"})
        }else{
            return true
        }
    }

    
    handleSubmit = (e)=>{
        e.preventDefault()

        if(this.isFormEmty(this.state)){
            this.setState({loader: true})
            createUserWithEmailAndPassword(getAuth(), this.state.email, this.state.password)
            .then((userCredential)=>{
                console.log(userCredential.user.uid)

                updateProfile(getAuth().currentUser,{
                    displayName: this.state.username
                }).then(()=>{
                    this.writeUserData(userCredential)
                })
                .then(()=>{
                    this.setState({username: ""})
                    this.setState({email: ""})
                    this.setState({password: ""})
                    this.setState({confirmPassword: ""})
                    this.setState({errorMsg: ""})
                    this.setState({successMsg: "Account Created Successfully"})
                    this.setState({loader: false})
                }).catch((error)=>{
                    this.setState({loader: false})
                    const errorCode = error.code;
                    if(errorCode){
                        this.setState({errorMsg: "User name Not Valid"})
                    }
                })
                
            }).catch((error)=>{
                this.setState({loader: false})
                const errorCode = error.code;
                if(errorCode.includes("email")){
                    this.setState({errorMsg: "Email Already in Use"})
                }
            })
        }

    }


writeUserData = (user) => {
        const db = getDatabase();
        
        set(ref(db, 'users/' + user.user.uid), {
          username: this.state.username,
        });
      }


    render() {

        const {username,email,password,confirmPassword,errorMsg,successMsg,loader} = this.state

        return (
            
            <Grid textAlign="center" verticalAlign="center" style={{marginTop:"100px"}}>
                <Grid.Column style={{maxWidth: 500}}>
                <Header as='h1' icon textAlign="center" color="blue">
                    <Icon name="group"/>
                    Let's Join MERN ADDA
                </Header>
                <Segment stacked>
                {/* error msg start */}

                    {errorMsg ? <Message error>
                    <Message.Header>{errorMsg}</Message.Header>
                </Message>: ""}

                {/* error msg end */}

                {/* success msg start */}
                    {successMsg ? <Message positive>
                    <Message.Header>{successMsg}</Message.Header>
                </Message>: ""}
                {/* success msg end */}

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field >
                    <label style={{textAlign:  "left"}}> <Icon name="user"/> User Name</label>
                    <input name="username" placeholder='First Name' type="text" onChange={this.handeleChange} value={username} />
                    </Form.Field>
                    <Form.Field className={errorMsg.includes("Email") ? "error" : ""}>
                    <label style={{textAlign:  "left"}}> <Icon name="mail"/>E-mail</label>
                    <input name="email" placeholder='Your E-mail' type="email" onChange={this.handeleChange} value={email}/>
                    </Form.Field>
                    <Form.Field className={errorMsg.includes("Password") ? "error" : ""}>
                    <label style={{textAlign:  "left"}}><Icon name="lock"/>Password</label>
                    <input name="password" placeholder='Your Password' type="password" onChange={this.handeleChange} value={password}/>
                    </Form.Field>
                    <Form.Field className={errorMsg.includes("Password") ? "error" : ""}>
                    <label style={{textAlign:  "left"}}><Icon name="repeat"/> Confirm Password</label>
                    <input name="confirmPassword" placeholder='Confirm Password' type="password" onChange={this.handeleChange} value={confirmPassword}/>
                    </Form.Field>
                    <Button className={loader ? 'loading primary disabled' : ''} color="blue" type='submit'>Submit</Button>
                </Form>
               
                </Segment>
                <Message>
                    <Message.Header>Already Have An Account? <Link to="/login">Log In</Link> </Message.Header>
                </Message>
                </Grid.Column>
            </Grid>
        )
    }
}
