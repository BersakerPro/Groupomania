const router = require("express").Router();
const authControllers = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
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
router.post("/upload", upload.single("file"), (req, res) => {
  res.send("fichier envoyé");
});

module.exports = router;
