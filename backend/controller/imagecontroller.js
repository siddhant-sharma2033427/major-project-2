import Plant_image from '../models/Binary_image.js';

// Route to retrieve and display the image
export const image_data =  async (req, res) => {
  try {
    const imageRecord = await Plant_image.findById(req.params.id);
    if (!imageRecord || !imageRecord.image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Set response content type to image
    res.set('Content-Type', 'image/jpeg');
    
    // Send image data
    console.log(imageRecord.image.image)
    res.send(imageRecord.image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const allImage = async (req,res) =>{
  try {
    const imageRecords = await Plant_image.find({});
    if (!imageRecords) {
      return res.status(404).json({ message: 'No images found' });
    }

    res.json(imageRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

