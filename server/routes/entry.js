const express = require("express");
const { check } = require("express-validator");

const entryController = require("../controllers/entry");
const validationHandler = require("../middleware/validation-handler");

const router = express.Router();

router.get(
  "/fetchLatestByUserId/:id",
  entryController.getFetchLatestByUserId
);
router.get(
  "/fetchAllByUserId/:id",
  entryController.getFetchAllByUserId
);
router.get("/fetchLateStatus", entryController.getFetchLateStatus);

// Reports
router.get("/fetchAllEntries", entryController.getFetchAllEntries);
router.get(
  "/exportExcelAllEntries",
  entryController.getExportExcelAllEntries
);

router.get("/fetchSumEntries", entryController.getFetchSumEntries);
router.get(
  "/exportExcelSumEntries",
  entryController.getExportExcelSumEntries
);

router.post(
  "/",
  [
    check("userId").isNumeric(),
    check("temperature").isFloat(),
    check("entryDate").isLength({ min: 8, max: 25 }),
    check("questions.*.question").isLength({ min: 1, max: 65535 }),
    check("questions.*.answer").isBoolean()
  ],
  validationHandler,
  entryController.postAdd
);

router.put(
  "/",
  [
    check("id").isNumeric(),
    check("userId").isNumeric(),
    check("temperature").isFloat(),
    check("entryDate").isLength({ min: 8, max: 25 }),
    check("questions.*.question").isLength({ min: 1, max: 65535 }),
    check("questions.*.answer").isBoolean()
  ],
  validationHandler,
  entryController.putModify
);

router.delete("/:id", entryController.deleteEntry);

module.exports = router;
