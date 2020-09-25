import React, { useEffect, useState } from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core'
import firebase from 'firebase';
import { db } from './firebase';
function Post({currentUser, username, postId, userImage, postImageUrl, imageCaption }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    // *for getting comments for each post
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timestamp','desc').onSnapshot((snapshot) => {
                setComments(
                    snapshot.docs.map((doc) =>{ 
                      return  { comment:doc.data(),id:doc.id}
                    })
                );
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId])

    const postComment = (e) => {
        e.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text:comment,
            username:currentUser?.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');

    }

    return (
        <div className='post'>
            <div className="post__header">
                <Avatar className='post__avatar' alt='AbdiMussa' src={userImage} />
                <h3>{username}</h3>

            </div>
            <div className="post__body">
                <img className='post__image' src={postImageUrl} alt="" />
                <div className="post__info">

                    <strong>{username}</strong>
                    <p>{imageCaption}</p>


                </div>
                <div className="post__comments">
                    {comments.map(({id,comment})=>{
                      return  <p key={id}><strong>{comment.username}</strong> {comment.text}</p>
                    })}
                </div>
                {currentUser?
                
                (<form className="post__commentForm" >
                    <input
                        type='text'
                        placeholder='Add a comment...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button disabled={!comment} type='submit' onClick={postComment}>
                        Post
                    </button>
                </form>)
                :
                (<p style={{margin:'auto',fontWeight:600,marginBottom:10, marginTop:5}}>Sign In to comment on this post</p>)
            }
            </div>
        </div>
    )
}

export default Post
