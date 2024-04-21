import React from 'react';
import Camera from './components/camera';
import ImageGallery from './components/ImageGallery';
import './App.css';

const App = () => {
  const capturedImages = [];

  return (
    <div className="app">
      <Camera />
      <ImageGallery images={capturedImages} />
      <marquee>Developed by Rahul Chandnani</marquee>
    </div>
  );
};

export default App;
