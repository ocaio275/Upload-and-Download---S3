const DocumentService = require("./document.service");
const { isEmpty } = require("lodash");
const ERROR_MESSAGE = require("../../utils/error-message");

class DocumentController {
  constructor() {
    this.documentService = new DocumentService();
  }

  async uploadDocs(req, res) {
    try {
      const { userId } = req.params;
      const { file } = req;

      if (isEmpty(userId)) throw new Error(ERROR_MESSAGE.USER.ID_EMPTY);
      if (isEmpty(file)) throw new Error(ERROR_MESSAGE.UPLOAD.FILE_EMPTY);

      await this.documentService.uploadDocs(userId, file);

      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getUrlPreSigned(req, res) {
    try {
      const { userId, id } = req.params;

      if (isEmpty(userId)) throw new Error(ERROR_MESSAGE.USER.ID_EMPTY);

      const url = await this.documentService.getUrlPreSigned(id, userId);

      return res.status(200).json({ payload: url });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findAllDocsByUserId(req, res) {
    try {
      const { userId } = req.params;

      if (isEmpty(userId)) throw new Error(ERROR_MESSAGE.USER.ID_EMPTY);

      const docs = await this.documentService.findAllDocsByUserId(userId);

      return res.status(200).json({ payload: docs });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteDocument(req, res) {
    try {
      const { userId, id } = req.params;

      if (isEmpty(userId)) throw new Error(ERROR_MESSAGE.USER.ID_EMPTY);
      if (isEmpty(id)) throw new Error(ERROR_MESSAGE.UPLOAD.ID_EMPTY);

      await this.documentService.deleteDocument(id);

      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = DocumentController;
