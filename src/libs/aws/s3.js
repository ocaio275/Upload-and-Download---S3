const { S3 } = require("aws-sdk");
const fs = require("fs");
const { v4 } = require("uuid");
const {
  getFileExtensionByMimeType,
} = require("../../utils/get-file-extension-by-mime-type");

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } =
  process.env;

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_BUCKET_REGION,
});

const upload = async (file) => {
  try {
    const fileStream = fs.createReadStream(file?.path);
    const Key = generateKey(file);
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key,
      Body: fileStream,
    };

    const fileUpload = await s3.upload(params).promise();

    fs.unlinkSync(file.path);

    return fileUpload.Key;
  } catch (error) {
    console.log(error);
  }
};

const generateKey = (file) => {
  const fileExtension = getFileExtensionByMimeType(file.mimetype);
  const Key = `${v4()}-${Date.now()}.${fileExtension}`;

  return Key;
};

const getSignedUrl = async (Key) => {
  try {
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key,
      Expires: 120,
    }
    const url = await s3.getSignedUrlPromise("getObject", params);

    return url;
  } catch (error) {
    console.log(error);
  }
};

const deleteObject = async (Key) => {
  try {
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: Key,
    }
    return await s3.deleteObject(params).promise();

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  upload,
  getSignedUrl,
  deleteObject
};
