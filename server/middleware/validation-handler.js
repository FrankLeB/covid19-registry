/**
 * Validation handler middleware
 * @author: Francois LeBouthillier
 */
const { validationResult } = require("express-validator");

/**
 * Check if the current request has validation errors
 */
module.exports = (req, res, next) => {
  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    const error = new Error("Validation error");
    error.statusCode = 400;
    error.data = valErr.array();
    error.route = "middleware";
    error.endPoint = "validation-handler";

    return next(error);
  }

  return next();
};
