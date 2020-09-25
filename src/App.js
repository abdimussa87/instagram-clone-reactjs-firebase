import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Post from './Post';
import { auth, db } from './firebase'
import AuthenticationModal from './AuthenticationModal';
import ImageUpload from './ImageUpload';
function App() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [signingIn, setSigningIn] = useState(false)
  useEffect(() => {
    // * for authenctication listener
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // *user is logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    // * cleanup if out user changes username many times
    return () => {
      unsubscribe();
    }
  }, [user])


  // * for loading posts from firebase
  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => {
        return { id: doc.id, post: doc.data() }
      }));
    })

  }, [])

  const postComponents = posts.map(({ id, post }) => <Post key={id} username={post.username}
    userImage={post.userImage}
    postImageUrl={post.postImageUrl}
    imageCaption={post.imageCaption} />)


  const openModal = () => {
    setOpen(true);
  }

  return (
    <div className="app">
      <AuthenticationModal signingIn={signingIn} open={open} handleClose={() => {
        setOpen(false);
        setSigningIn(false);
      }} />
      <Header openModal={openModal} user={user} handleSigningIn={() => {
        setSigningIn(true)
        openModal();
      }} />

      {postComponents}

      {user ?
        (<ImageUpload username={user?.displayName} />
        )
        :
        <h3 style={{margin:40 +'px'}}>Login to upload</h3>
      }

    </div>
  );
}

export default App;
