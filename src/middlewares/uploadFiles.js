const multer = require("multer");

const uploadFiles = () => {
    return multer({
        dest: "tmp/"
    }).single("file");
}

module.exports = {
    uploadFiles,
}