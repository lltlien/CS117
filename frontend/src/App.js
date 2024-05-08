import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [dyedImage, setDyedImage] = useState(null);

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file != null) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDyeClick = async () => {
    if (!selectedColor || !selectedImage) {
      alert('Please select both a color and an image.');
      return;
    }

    const formData = new FormData();
    formData.append('color', selectedColor);
    formData.append('image', selectedImage);

    try {
      const response = await fetch('/dye', {
        method: 'POST',
        body: formData,
      });
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setDyedImage(imageUrl);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to dye the image.');
    }
  };

  return (
    <div className='App'>
      <h1 className='sweet-title'>
        <span data-text='Virtual Hair Dye Try-on'> Virtual Hair Dye Try-on</span>
      </h1>
      
      <div className='display'>
        <div className='flex-item'>
          <div className='previewImage'>
            <label className='button-4' id='selectImage'>
              
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
          <div className='Image'>
            {previewImage && (
              <img src={previewImage} alt="Selected" style={{ maxWidth: '300px' }} />
            )}
          </div>
        </div>
        <div className='setting'>
          <div className='selectColor'>
            <label className='custom-file'>
              Select Color
            </label>
            <input className='color_change' type="color" value={selectedColor} onChange={handleColorChange} />
            <button className='button-30' id='butDye' onClick={handleDyeClick}>Dye</button>
          </div>
        </div>
        <div className='dyeImage'>
          <div className='Image'>
            {dyedImage && (
              <img src={dyedImage} alt="Dyed" style={{ maxWidth: '300px' }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
