const { Readable } = require("stream");
const cloudinary = require("../utils/cloudinary");

const upload = async (buffer) => {
    const imageStream = Readable.from(buffer);
    const cloudinaryResult = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        imageStream.pipe(upload_stream);
    });
    return cloudinaryResult.secure_url;
};


module.exports = { upload };
