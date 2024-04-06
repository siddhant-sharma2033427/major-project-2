import React, { useState, useEffect } from 'react';
import { getAllImage } from '../utils/api';
import './ShowAllImage.css';

const ShowAllImage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getAllImage();
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const arrayBufferToBase64 = buffer => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    return (
        <div className="image-grid">
            {images.map(image => {
                const imageData = `data:image/jpeg;base64,${arrayBufferToBase64(image.image.data)}`;
                
                return (
                    <img key={image._id} src={imageData} alt="Image" className="image-item" />
                );
            })}
        </div>
    );
};

export default ShowAllImage;
