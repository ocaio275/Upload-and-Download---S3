const router = require("express").Router();
const UserController = require("./user.controller")

const userController = new UserController()

router.get("/user/findAll", userController.findAllUsers)
router.post("/user/create", userController.createUser)
router.patch("/user/update", userController.updateUser)
router.delete("/user/delete", userController.deleteUser)


module.exports = router;
