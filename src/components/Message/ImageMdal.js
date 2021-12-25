import { uploadBytesResumable,getDownloadURL,ref } from 'firebase/storage'
import React, { Component } from 'react'

import { Header,Icon,Modal,Button,Input,Progress,Segment } from 'semantic-ui-react'
import { storage,getDatabase, set,push,child,ref as refer } from '../../firebase'

export default class ImageMdal extends Component {
    state={
        file:"",
        progress:""
    }

    handleImage=(event)=>{
        this.setState({file:event.target.files[0]})
    }

    handleUpload = () =>{
        if(this.state.file){
            let storageRef = ref(storage,`files/${this.state.file.name}`)
            let uploadtask = uploadBytesResumable(storageRef,this.state.file)
            uploadtask.on("state-changed",(snapshot)=>{
                let proegress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({progress:proegress})
            },(err)=>{
                console.log("error",err)
            },()=>{
                getDownloadURL(uploadtask.snapshot.ref).then((url)=>{
                        const db = getDatabase();
                        const groupRef = refer(db, 'files');
                        const newGroup = push(child(groupRef, `${this.props.groupid.id}`));
                        set(newGroup, {
                            fileurl: url,
                            date: Date(),
                            sender: this.props.userid.uid,
                            group:this.props.groupid.id,
                            username: this.props.userid.displayName
                    }).then(()=>{
                        this.props.close()
                        this.setState({progress:""})
                    }).catch(err=>{
                        console.log("ami")
                    })
                }).catch(err=>{
                    console.log("error ase",err)
                })
            })
        }else{
            console.log("data nai")
        }
    }

    render() {
        return (
            <Modal
            basic
            open={this.props.modal}
            size='small'
            >
            <Header icon>
                <Icon name='group' />
                Add Group Details
            </Header>
            <Modal.Content>
            <Input onChange={this.handleImage} type="file" icon='upload' placeholder='Search...' />
            </Modal.Content>
            <Modal.Actions>
           {this.state.progress
                ?
                <Progress percent={this.state.progress} inverted progress success>
                Uploading
            </Progress>
            :
            ""
            }
                <Button onClick={this.handleUpload} color='green' inverted  >
                <Icon name='checkmark' /> Upload
                </Button>
                <Button basic color='red' inverted onClick={this.props.close}>
                <Icon name='remove' /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
        )
    }
}
