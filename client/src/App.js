import React, { useEffect } from 'react'
import axios from 'axios'
import bgGradient from './Images/hero-gradient.svg'
import './App.css';

import ImageGallery from './components/ImageElements/Gallery';
import Image from './components/ImageElements/OverlayImage';

function App() {

  // useEffect(() => {
  //   axios.get('api/gallery', {headers: getHeaders()})
  //     .then(console.log)
  //     .catch(console.log)
  // })

  return (
    <div className="main-content">
      <div className="bg-gradient">
        <div className="hero-text">
          <h1>The Only </h1>
          <h1>Internet Place You Need</h1>
          <h1>For Your Photos</h1>
        </div>
      </div>
      <ImageGallery />
    </div>
  );
}

export default App;
