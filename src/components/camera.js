import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import ImageGallery from './ImageGallery';

import "./Camera.css";
const Camera = () => {
  const webcamRef = useRef(null);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [aspectRatio, setAspectRatio] = useState({ width: 16, height: 9 });
  const [capturedImages, setCapturedImages] = useState([]);
  const [showg, setshowg] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const handleStartCamera = () => {
    navigator.mediaDevices
      .getUserMedia({video: { facingMode: facingMode } })
      .then((stream) => {
        setIsCameraAvailable(true);
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
        setAspectRatio({ width: 16, height: 9 });
      })
      .catch((err) => console.error('Error accessing camera:', err));
  };

  const toggleCamera = () => {
    setFacingMode((prevFacingMode) => (prevFacingMode === 'user' ? 'environment' : 'user'));
  };
  const setgallery = () => {
    setshowg(false);
  };

  const handleZoomIn = () => {
    setZoom(zoom + 0.1);
  };

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.1);
    }
  };

  const handleAspectRatioChange = (e) => {
    console.log(e);
    const selectedAspectRatio = e.target.value.split(':');
    setAspectRatio({ width: parseInt(selectedAspectRatio[0]), height: parseInt(selectedAspectRatio[1]) });
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImages([...capturedImages, imageSrc]);
  };
  const deleteImage = (index) => {
    setCapturedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    
    if (webcamRef.current) {
      const videoElement = webcamRef.current.video;
      if (videoElement) {
        const { width, height } = aspectRatio;
        videoElement.width = videoElement.clientWidth;
        videoElement.height = videoElement.clientWidth * (height / width);
      }
    }
  }, [aspectRatio]);


  if (!isCameraAvailable) {
    return (
      <div className='appcontainer'>

        <button onClick={handleStartCamera}>Start Camera</button>
        <p>Start clicking and build memories</p>
        <h2 className='text2'>After starting camera scroll down to capture pictures, toggle camera and view gallery.</h2>

      </div>
    );
  }
 
  return (
    <div>{!showg?
        <div className='camerapage'>
            <p className="text2">Scroll down to capture pictures, toggle camera and view gallery.</p>
        <div className='camcontainer'>
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored={isFrontCamera}
        screenshotFormat="image/jpeg"
        width="100%"
        height="auto"
        videoConstraints={{ facingMode: facingMode,zoom: zoom }}
      />
      </div>
      <div className='button-container'>
        <button onClick={toggleCamera} className='toggle-button'>Toggle Camera</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <select value={`${aspectRatio.width}:${aspectRatio.height}`} onChange={handleAspectRatioChange}>
          <option value="16:9">16:9</option>
          <option value="4:3">4:3</option>
          <option value="1:1">1:1</option>
        </select>
        <button onClick={captureImage}>Capture Image</button>

      </div>
<div className='gbtndiv'>
<button title="Click on it to view gallery" onClick={()=>{setshowg(true)}}>Your own Gallery</button>
</div>
</div>
:
<div>
      {capturedImages.length >0 ? <>        <button className='imggalbtn' title="Click on it to view gallery" onClick={()=>{setshowg(false)}}>{`${"<"} Back to Camera`}</button>
   <ImageGallery  images={capturedImages} onDelete={deleteImage}/></>:
      <div className='emptyg'>
        <button title="Click on it to view gallery" onClick={()=>{setshowg(false)}}>{`${"<"} Back to Camera`}</button>
        <p className='text'>Your Gallery is Empty!</p>
      <p className='text'>Click some pictures to build memories"</p>
      </div>
      }
      
    
    </div>}
    </div>
  );
};

export default Camera;
