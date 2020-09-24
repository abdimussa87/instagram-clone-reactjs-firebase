import React from 'react'
import './Post.css'
import {Avatar} from '@material-ui/core'
function Post({username,userImage,postImageUrl,imageCaption}) {
    return (
        <div className='post'>
            <div className="post__header">
            <Avatar className='post__avatar' alt='AbdiMussa' src={userImage}  />
            <h3>{username}</h3>

            </div>
            <div className="post__body">
                <img className='post__image' src={postImageUrl} alt=""/>
                <div className="post__info">
    <strong>{username}</strong> 
    <p>{imageCaption}</p>

                </div>
            </div>
        </div>
    )
}

export default Post
