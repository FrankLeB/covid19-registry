/**
 * Question controller
 * @author: Francois LeBouthillier
 */
const Question = require("../models/question");

const errorHandler = require("../middleware/error-handler");

/**
 * Fetch all the questions
 *
 * @return {Object} All the questions
 */
exports.getFetch = async (req, res, next) => {
  try {
    const questions = await Question.fetch();

    return res.status(200).json({
      questions
    });
  } catch (err) {
    return next(errorHandler(err, "/question", "getFetch"));
  }
};

/**
 * Fetch at max 10 questions
 *
 * @param {number} req.params.page Current page for the offset
 * @return {Object} At max 10 questions
 */
exports.getFetchLimit = async (req, res, next) => {
  const page = req.params.page;

  try {
    const questions = await Question.fetchLimit(10 * (page - 1));

    return res.status(200).json({
      questions
    });
  } catch (err) {
    return next(errorHandler(err, "/question", "getFetchLimit"));
  }
};

/**
 * Save a question to the database
 *
 * @param {string} req.body.question The question
 * @return {Object} An object with a result property
 */
exports.postAdd = async (req, res, next) => {
  const question = req.body.question;

  const q = new Question(null, question);

  try {
    await q.save();

    return res.status(201).json({
      result: "success"
    });
  } catch (err) {
    return next(errorHandler(err, "/question", "postAdd"));
  }
};

/**
 * Update a question in the database
 *
 * @param {number} req.body.id The id of the question
 * @param {string} req.body.question The question
 * @return {Object} An object with a result property
 */
exports.putModify = async (req, res, next) => {
  const id = req.body.id;
  const question = req.body.question;

  const q = new Question(id, question);

  try {
    await q.update();

    return res.status(200).json({
      result: "success"
    });
  } catch (err) {
    return next(errorHandler(err, "/question", "putModify"));
  }
};

/**
 * Delete a question from the database
 *
 * @param {number} req.params.id The id of the question
 * @return {Object} An object with a result property
 */
exports.deleteQuestion = async (req, res, next) => {
  const id = req.params.id;

  const q = new Question(id);

  try {
    await q.delete();

    return res.status(200).json({
      result: "success"
    });
  } catch (err) {
    return next(errorHandler(err, "/question", "deleteQuestion"));
  }
};
