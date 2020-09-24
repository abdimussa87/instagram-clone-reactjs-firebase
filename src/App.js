import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Post from './Post';

function App() {

  const[posts,setPosts] = useState([]);

  return (
    <div className="app">

      <Header />
      <Post username='Abdi Mussa' userImage="https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png" postImageUrl="https://cdn2.buyacar.co.uk/sites/buyacar/files/styles/w860/public/alfaromeogiulia.jpg?itok=olpZe-Yi" imageCaption="Instagram clone" />
      <Post username='Abdi Mussa' userImage="https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png" postImageUrl="https://cdn2.buyacar.co.uk/sites/buyacar/files/styles/w860/public/alfaromeogiulia.jpg?itok=olpZe-Yi" imageCaption="Nice clone" />
      <Post username='Abdi Mussa' userImage="https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png" postImageUrl="https://cdn2.buyacar.co.uk/sites/buyacar/files/styles/w860/public/alfaromeogiulia.jpg?itok=olpZe-Yi" imageCaption="Great clone" />

    </div>
  );
}

export default App;
