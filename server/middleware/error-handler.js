/**
 * Error handler middleware
 * @author: Francois LeBouthillier
 */

/**
 * Create an error message in the right format for our error logging
 *
 * @param {string} err Error message
 * @param {string} route Route name
 * @param {string} endPoint Route end point
 * @return {Error} The error object with the right properties
 */
module.exports = function (err, route, endPoint) {
  const error = new Error(err);
  error.statusCode = 500;
  error.route = route;
  error.endPoint = endPoint;
  return error;
};

