const express = require("express");
const { check } = require("express-validator");

const questionController = require("../controllers/question");
const validationHandler = require("../middleware/validation-handler");

const router = express.Router();

router.get("/fetch", questionController.getFetch);
router.get("/fetch/:page", questionController.getFetchLimit);

router.post(
  "/",
  [check("question").isLength({ min: 1, max: 65535 })],
  validationHandler,
  questionController.postAdd
);

router.put(
  "/",
  [check("id").isNumeric(), check("question").isLength({ min: 1, max: 65535 })],
  validationHandler,
  questionController.putModify
);

router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
