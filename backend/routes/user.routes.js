const router = require("express").Router();
const authControllers = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

//AUTHENTIFICATION
router.post("/register", authControllers.signup);
router.post("/login", authControllers.signin);
router.get("/logout", authControllers.logout);

//CRUD USER
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

//UPLOAD USER
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
