const cloudinary = require('cloudinary');

const cloudinaryConfig = cloudinary.config({
  cloud_name: 'framinus',
  api_key: '821233622211889',
  api_secret: 'process.env.CLOUDINARY_SECRET',
});

module.exports = cloudinaryConfig;
