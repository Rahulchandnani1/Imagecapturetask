import React from 'react';
import styled from 'styled-components';
import "./Camera.css";
const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  border:2px solid;
  border-radius:10px;
  width:90%;
  margin-left:auto;
  margin-right:auto;
`;

const Image = styled.img`
  width: 96%;
  height: auto;
  transition: transform 0.3s ease;
  border-radius:10px;
  padding:2%;
  
  height: auto;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.22);
  }
`;

const ImageGallery = ({ images, onDelete }) => {
    const handleDelete = (index) => {
        onDelete(index);
      };
  return (
    <GalleryContainer>
      {images.map((image, index) => (
        <div className='.image-container'>
        <Image className='imgc' key={index} src={image} alt={`Image ${index}`} />
        <button onClick={() => handleDelete(index)} className="delete-button">
            Delete
          </button>
        </div>
      ))}
    </GalleryContainer>
  );
};

export default ImageGallery;
