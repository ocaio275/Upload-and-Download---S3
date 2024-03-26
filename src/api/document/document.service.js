const DocumentRepository = require("./document.repository");
const UserService = require("../user/user.service");
const { isEmpty } = require("lodash");
const ERROR_MESSAGE = require("../../utils/error-message");
const { upload, getSignedUrl, deleteObject } = require("../../libs/aws/s3");

class DocumentService {
  constructor() {
    this.documentRepository = new DocumentRepository();
    this.userService = new UserService();
  }

  async uploadDocs(userId, file) {
    if (isEmpty(userId)) throw new Error(ERROR_MESSAGE.USER.ID_EMPTY);

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    const key = await upload(file, userId);

    const uploadData = {
      name: file.originalname,
      key,
      userId,
    };

    await this.documentRepository.create(uploadData);

    return;
  }

  async findAllDocsByUserId(userId) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    const docs = await this.documentRepository.findAllDocsByUserId(userId);
    return docs;
  }

  async getUrlPreSigned(id) {
    const doc = await this.documentRepository.findById(id);
    
    if (!doc) {
      throw new Error(ERROR_MESSAGE.UPLOAD.DOCUMENT_NOT_FOUND);
    }

    const url = await getSignedUrl(doc.key);

    return {
      name: doc.name,
      url,
    };
  }

  async deleteDocument(id){
    const doc = await this.documentRepository.findById(id);
    
    if (!doc) {
      throw new Error(ERROR_MESSAGE.UPLOAD.DOCUMENT_NOT_FOUND);
    }

    await deleteObject(doc?.key);
    await this.documentRepository.deleteDocument(id);
  }
}

module.exports = DocumentService;
