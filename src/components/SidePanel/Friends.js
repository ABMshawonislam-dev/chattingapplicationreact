import React, { Component } from 'react'
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved,onValue,push,set,onDisconnect } from "../../firebase";
import { Header,Icon,Modal,Button,Form,Message,Menu } from 'semantic-ui-react'
export default class Friends extends Component {
    state = {
        user: this.props.user,
        users:["sfgfg"]
    }


    componentDidMount(){
        if(this.state.user){
            this.addEventListeners(this.state.user)

        }
       
    }

    addEventListeners = (currentUser)=>{
       
        let loadedUsers=[]
        const db = getDatabase();
        const usersRef = ref(db, 'users/');
        const connectRef = ref(db, '.info/connected');
        const presentRef = ref(db, 'present/'+currentUser.uid);
        const presentRef2 = ref(db, 'present/');
        // const newConnectUser = push(presentRef);
        onChildAdded(usersRef, (snap) => {
            let user = snap.val()
            user['uid'] = snap.key
            user['status'] = 'offline'
            loadedUsers.push(user)
            this.setState({users:loadedUsers})
        })

        onValue(connectRef, (snap) => {
            if(snap.val() === true){
                set(presentRef, {
                    username: currentUser.displayName,
                    status: true
                })
                onDisconnect(presentRef).remove(err=>{
                    if(err !== null){
                        console.log(err)
                    }
                })
            }
        })

        onChildAdded(presentRef2, (snap) => {
            
            if(currentUser.uid !== snap.key){
            
                this.addUserStatus(snap.key,true)
    

            }
        })
        onChildRemoved(presentRef2, (snap) => {
            if(currentUser.uid !== snap.key){
                this.addUserStatus(snap.key,false)
            }
        })

       

        
    }

    addUserStatus = (userid,connected)=>{
        // console.log("ami aici",connected)
        let updateUser = this.state.users.reduce((initialvalue,user)=>{
           
            if(user.uid === userid){
                user['status'] = `${connected?'online':'offline'}`
            }
            // console.log(user)
             initialvalue.push(user)
             return initialvalue
        },[])

        // console.log(this.state.users)

        // console.log(updateUser)
        this.setState({users:updateUser})
    }

    


    

    render() {
        console.log()
        return (
            <>
                 <Header style={{color:"#fff",marginTop: 30,marginLeft:20}}>
                     Friends ({this.state.users.length})
                     <Icon  name="users" style={{display:"inline-block",marginLeft:83}}></Icon> 
                </Header>

                <Menu text vertical style={{color:"#fff",marginTop: 30,marginLeft:20}}>
                         {this.state.users.map((item)=>(
                            
                             <Menu.Item style={menulist}>{item.username}--{item.status}</Menu.Item>
                      

                         ))}
                       
                    </Menu>   
            </>
        )
    }
}

let menulist = {
    color:"#fff",
    fontSize: "16px"
}
