import React, { useState, useEffect } from 'react'
import ImageGallery from './components/ImageGallery/Gallery';
import { getImages } from './helpers/request'
import './App.css';

function App() {
  
  const [state, setState] = useState({ images: [], loading: true })

  useEffect(() => {
    getImages()
      .then(images => {
        setState({
          images,
          loading: false
        })
      })
      .catch(console.log)
  }, [])

  return (
    <div className="main-content">
      <div className="bg-gradient">
        <div className="hero-text">
          <h1>The Only </h1>
          <h1>Internet Place You Need</h1>
          <h1>For Your Photos</h1>
        </div>
      </div>
      {
        state.loading
        ? <></>
        : <ImageGallery images={ state.images } />
      }
    </div>
  );
}

export default App;
