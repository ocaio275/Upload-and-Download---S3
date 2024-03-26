const getFileExtensionByMimeType = (mimeType) => {
  const mimeTypes = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "application/pdf": "pdf",
  };
  return mimeTypes[mimeType];
};

module.exports = {
  getFileExtensionByMimeType,
};
