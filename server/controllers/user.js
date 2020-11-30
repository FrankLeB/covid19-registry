/**
 * User controller
 * @author: Francois LeBouthillier
 */
const fs = require("fs");

const User = require("../models/user");

const errorHandler = require("../middleware/error-handler");

/**
 * Fetch all the users
 *
 * @return {Object} Every users
 */
exports.getFetch = async (req, res, next) => {
  try {
    const users = await User.fetch();

    return res.status(200).json({
      users
    });
  } catch (err) {
    return next(errorHandler(err, "/user", "getFetch"));
  }
};

/**
 * Fetch at max 10 entries of user
 *
 * @param {number} req.params.page Current page
 * @return {Object} At max 10 user entries
 */
exports.getFetchLimit = async (req, res, next) => {
  const page = req.params.page;

  try {
    const users = await User.fetchLimit(10 * (page - 1));

    return res.status(200).json({
      users
    });
  } catch (err) {
    return next(errorHandler(err, "/user", "getFetchLimit"));
  }
};

/**
 * Fetch a user by id
 *
 * @param {number} req.params.id The id of the user
 * @return {Object} The user
 */
exports.getFetchById = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    const user = await User.fetchById(id);

    return res.status(200).json({
      user
    });
  } catch (err) {
    return next(errorHandler(err, "/user", "getFetchById"));
  }
};

/**
 * Fetch users which their name or id matches the user input
 *
 * @param {string} req.params.input User input
 * @return {Object} Users matching the user input
 */
exports.getFindByNameAndId = async (req, res, next) => {
  const input = req.params.input;

  try {
    const users = await User.findByNameAndId(input);

    return res.status(200).json({
      users
    });
  } catch (err) {
    return next(errorHandler(err, "/user", "getFindByNameAndId"));
  }
};

/**
 * Insert a user to the database
 *
 * @param {string} req.body.name User name
 * @param {string} req.body.phoneNo User phone number
 * @param {string} req.body.iamge Image filename for the user
 * @return {Object} An object with a result property
 */
exports.postAdd = async (req, res, next) => {
  const name = req.body.name;
  const phoneNo = req.body.phoneNo;
  const image = req.file ? req.file.filename : "";

  try {
    const user = new User(null, name, phoneNo, image);
    await user.save();

    return res.status(201).json({
      result: "success"
    });
  } catch (err) {
    return next(errorHandler(err, "/user", "postAdd"));
  }
};

/**
 * Update a user already in the database
 *
 * @param {number} req.body.id The id
 * @param {string} req.body.name User name
 * @param {string} req.body.phoneNo User phone number
 * @param {string} req.body.image Image filename for the user
 * @return {Object} An object with a result property
 */
exports.putModify = async (req, res, next) => {
  if (req.file && req.body.image) {
    fs.unlink(process.env.IMAGE_PATH + req.body.image, err => {
      if (err) {
        console.log(`File: ${req.body.image} does not exist`);
      }
    });
  }

  const id = req.body.id;
  const name = req.body.name;
  const phoneNo = req.body.phoneNo;
  const image = req.file ? req.file.filename : req.body.image;

  const user = new User(id, name, phoneNo, image);

  try {
    await user.update();

    return res.status(200).json({
      result: "success"
    });
  } catch (err) {
    return next(errorHandler(err, "/user", "putModify"));
  }
};

/**
 * Delete a user from the database
 *
 * @param {number} req.params.id User id
 * @return {Object} An object with a result property
 */
exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  const user = new User(id);

  try {
    await user.delete();

    const image = await User.fetchImageFilenameById(id);

    if (image) {
      fs.unlink(process.env.IMAGE_PATH + image, err => {
        if (err) {
          console.log(`File: ${image} does not exist`);
        }
      });
    }

    return res.status(200).json({
      result: "success"
    });
  } catch (err) {
    return next(errorHandler(err, "/user", "deleteUser"));
  }
};
