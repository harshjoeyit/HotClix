import React from 'react'
import ImageGallery from './components/ImageGallery/Gallery';
import './App.css';

function App() {
  
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
