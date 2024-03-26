const DocumentController = require("./document.controller");
const { authenticateJWT } = require("../../middlewares/authorization");
const { uploadFiles } = require("../../middlewares/uploadFiles");
const { validateUserId } = require("../../middlewares/validateUserId")

class DocumentRouter {
  constructor(router) {
    this.documentController = new DocumentController();

    router.route("/docs/:userId/").post(...this._uploadDocs());
    router
      .route("/docs/:userId/docs/:id")
      .get(...this._getUrlPreSigned())
      .delete(...this._deleteDocument());
    router.route("/docs/:userId/all/").get(...this._findAllDocsByUserId());
  }

  _uploadDocs() {
    return [
      authenticateJWT(),
      validateUserId(),
      uploadFiles(),
      (...agrs) => this.documentController.uploadDocs(...agrs),
    ];
  }

  _getUrlPreSigned() {
    return [
      authenticateJWT(),
      validateUserId(),
      (...agrs) => this.documentController.getUrlPreSigned(...agrs),
    ];
  }

  _findAllDocsByUserId() {
    return [
      authenticateJWT(),
      validateUserId(),
      (...agrs) => this.documentController.findAllDocsByUserId(...agrs),
    ];
  }

  _deleteDocument() {
    return [
      authenticateJWT(),
      validateUserId(),
      (...agrs) => this.documentController.deleteDocument(...agrs),
    ];
  }
}

module.exports = DocumentRouter;
