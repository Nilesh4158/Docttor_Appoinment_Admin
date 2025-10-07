import multer from "multer";

// Configure how files are stored
const storage = multer.diskStorage({
    // 1. Set the destination for uploaded files
    destination: function (req, file, callback) {
        // This will save files to a folder named 'uploads' in your backend directory.
        // The folder will be created automatically if it doesn't exist.
        callback(null, "uploads");
    },

    // 2. Create a unique filename to prevent overwriting
    filename: function (req, file, callback) {
        // Example: 1723456789_profile-pic.png
        const uniqueSuffix = Date.now();
        callback(null, uniqueSuffix + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export default upload;

