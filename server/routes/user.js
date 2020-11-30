const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user");
const validationHandler = require("../middleware/validation-handler");
const upload = require("../middleware/file-upload");

const router = express.Router();

router.get("/fetch", userController.getFetch);
router.get("/fetch/:page", userController.getFetchLimit);
router.get("/fetchById/:id", userController.getFetchById);
router.get("/findByNameAndId/:input", userController.getFindByNameAndId);

router.post(
  "/",
  upload.single("userImage"),
  [
    check("name").isLength({ min: 1, max: 60 }),
    check("phoneNo").isLength({ min: 1, max: 15 })
  ],
  validationHandler,
  userController.postAdd
);

router.put(
  "/",
  upload.single("userImage"),
  [
    check("id").isNumeric(),
    check("name").isLength({ min: 1, max: 60 }),
    check("phoneNo").isLength({ min: 1, max: 15 })
  ],
  validationHandler,
  userController.putModify
);

router.delete("/:id", userController.deleteUser);

module.exports = router;
