const DocumentModel = require("./document.model");

class DocumentRepository {
  constructor() {
    this.documentModel = DocumentModel;
  }

  async create(uploadData) {
    return await this.documentModel.create(uploadData);
  }

  async findAllDocsByUserId (userId) {
    const docs = await this.documentModel.findAll({
      where: {
        userId,
      },
    });

    return docs;
  }

  async findById(id) {
    return await this.documentModel.findByPk(id);    
  }

  async deleteDocument(id) {
    return await this.documentModel.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = DocumentRepository;
