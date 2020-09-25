import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import './ImageUpload.css';
import {storage,db} from './firebase';
import firebase from 'firebase';

function ImageUpload({username}) {

    const [caption,setCaption] = useState('');
    const [image,setImage] = useState(null);
    const [progress,setProgress] = useState(0);

    const handleImage = (e) => {
        // *incase a user selects multiple images take only the first one
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }  

    const handleUpload=()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                // *progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            // * error function
            (error)=>{
                alert(error.message);
                console.log(error.message);
            },
            // *complete function ...
            ()=>{
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(URL=>{
                    
                    db.collection('posts').add({
                        imageCaption:caption,
                        username:username,
                        userImage:'',
                        postImageUrl:URL,
                        timestamp:firebase.firestore.FieldValue.serverTimestamp()
                    });
                });
                setProgress(0);
                setCaption('');
                setImage(null);
            }
            )
    }

      return (
        <div className='imageUpload'>
            <progress className='imageUpload__progress' value={progress} max='100' />
            <input type="text" placeholder='Enter a caption ...' value={caption} onChange={e=>setCaption(e.target.value)} />
            <input className='imageUpload__inputFile' type="file" onChange={handleImage} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
