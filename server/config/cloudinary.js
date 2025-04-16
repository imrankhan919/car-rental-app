const  { v2 : cloudinary } = require('cloudinary');
const fs = require('fs');

  // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME , 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
        });

        const uploadOnCloudinary = async (localFilePath) => {
            try{
                if (!localFilePath) {
                    throw new Error('No file path provided');
                }
                const response = await cloudinary.uploader.upload(localFilePath, {
                    resource_type: 'auto',
                })
                fs.unlinkSync(localFilePath)
                return response;
            }
            catch (error) {
                fs.unlinkSync(localFilePath); // delete local file
                throw new Error(`Error uploading to Cloudinary: ${error.message}`);
              }
        }

        module.exports = uploadOnCloudinary;
    
    // Upload an image
    //  const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
;