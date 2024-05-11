const cloudinary = require("../utils/cloudinary");

const upload = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res.secure_url;
};

module.exports = { upload };
