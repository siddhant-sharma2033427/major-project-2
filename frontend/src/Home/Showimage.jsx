import React, { useState, useEffect } from 'react';
import {getImagestr} from '../utils/api'

const Showimage = () => {
    const [imageId,setImageId] = useState("")
    useEffect(()=>{
        const test = async ()=>{
        const id = await getImagestr();
        // console.log("image str::::===",id.data.result[0].imageIdStr)
        setImageId(`http://localhost:8000/image/${id.data.result[0].imageIdStr}`)
        console.log("imaeg ::::====",imageId)
        }
        test();
    })
    return (
        <div>
            
            {/* <img src="http://localhost:8000/image/660b206e1161e71183583e96" alt="Image" width="200px" height="200px"></img> */}
            <img src={imageId} alt="Image" width="200px" height="200px"></img>
        </div>
    );
};

export default Showimage;
